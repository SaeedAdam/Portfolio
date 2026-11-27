import type { Collections } from '@nuxt/content'

type Base = 'index' | 'projects' | 'pages' | 'about'
type LocaleCode = 'en' | 'ar'

/**
 * Name of the content collection for the active locale, e.g. `index_ar`.
 * Each locale has its own collection (see content.config.ts) with an identical schema,
 * so the English collection's type is used for both.
 */
export function useLocalizedCollection<B extends Base>(base: B) {
  const { locale } = useI18n()
  return computed(() => `${base}_${locale.value as LocaleCode}` as `${B}_en` & keyof Collections)
}
