import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

// One set of collections per locale (content/en, content/ar), all sharing a schema.
// Pages query `<name>_<locale>`, e.g. `index_ar`; see app/composables/useLocalizedContent.ts.
const locales = ['en', 'ar'] as const

const indexSchema = z.object({
  hero: z.object({
    links: z.array(createButtonSchema())
  }),
  about: createBaseSchema(),
  experience: z.object({
    title: z.string(),
    items: z.array(z.object({
      date: z.string(),
      position: z.string(),
      summary: z.string().optional(),
      company: z.object({
        name: z.string(),
        url: z.string().optional()
      })
    }))
  }),
  contact: createBaseSchema()
})

const projectSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  image: z.string().nonempty().editor({ input: 'media' }),
  url: z.string().nonempty(),
  tags: z.array(z.string()),
  date: z.string()
})

const pagesSchema = z.object({
  links: z.array(createButtonSchema())
})

const localized = <T>(build: (locale: typeof locales[number]) => T) =>
  Object.fromEntries(locales.map(locale => [locale, build(locale)])) as Record<typeof locales[number], T>

const index = localized(locale => defineCollection({
  type: 'page', source: `${locale}/index.yml`, schema: indexSchema
}))
const projects = localized(locale => defineCollection({
  type: 'data', source: `${locale}/projects/*.yml`, schema: projectSchema
}))
const pages = localized(locale => defineCollection({
  type: 'page', source: `${locale}/projects.yml`, schema: pagesSchema
}))
const about = localized(locale => defineCollection({
  type: 'page', source: `${locale}/about.md`
}))

export default defineContentConfig({
  collections: {
    index_en: index.en,
    index_ar: index.ar,
    projects_en: projects.en,
    projects_ar: projects.ar,
    pages_en: pages.en,
    pages_ar: pages.ar,
    about_en: about.en,
    about_ar: about.ar
  }
})
