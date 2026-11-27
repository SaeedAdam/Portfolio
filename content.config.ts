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

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
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
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: 'media' }),
        url: z.string().nonempty(),
        tags: z.array(z.string()),
        date: z.string()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'projects.yml' }
      ],
      schema: z.object({
        links: z.array(createButtonSchema())
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.md'
    })
  }
})
