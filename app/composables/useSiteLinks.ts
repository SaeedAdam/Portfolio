import type { NavigationMenuItem } from '@nuxt/ui'

/** Header navigation, translated and pointing at the active locale's routes. */
export function useNavLinks() {
  const { t } = useI18n()
  const localePath = useLocalePath()

  return computed<NavigationMenuItem[]>(() => [{
    label: t('nav.home'),
    icon: 'i-lucide-home',
    to: localePath('/')
  }, {
    label: t('nav.projects'),
    icon: 'i-lucide-folder',
    to: localePath('/projects')
  }, {
    label: t('nav.about'),
    icon: 'i-lucide-user',
    to: localePath('/about')
  }, {
    label: t('nav.contact'),
    icon: 'i-lucide-mail',
    to: `${localePath('/')}#contact`,
    exactHash: true
  }])
}

/** Social links from app.config with translated aria-labels. */
export function useSocialLinks() {
  const { t } = useI18n()
  const { footer } = useAppConfig()

  return computed(() => footer.links.map(({ id, ...link }) => ({
    ...link,
    'aria-label': t(`social.${id}`)
  })))
}
