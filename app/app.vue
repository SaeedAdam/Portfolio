<script setup lang="ts">
import { ar, en } from '@nuxt/ui/locale'

const { t, locale } = useI18n()
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

// lang/dir on <html>, hreflang alternates, canonical and og:locale for the active locale.
const i18nHead = useLocaleHead({ dir: true, lang: true, seo: true })

useHead({
  htmlAttrs: {
    lang: () => i18nHead.value.htmlAttrs.lang,
    dir: () => i18nHead.value.htmlAttrs.dir
  },
  link: () => [
    { rel: 'icon', type: 'image/jpeg', sizes: '32x32', href: '/favicon-32x32.jpg' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.jpg' },
    ...(i18nHead.value.link ?? [])
  ],
  meta: () => [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color.value },
    ...(i18nHead.value.meta ?? [])
  ]
})

useSeoMeta({
  titleTemplate: (title?: string) => {
    const site = t('meta.siteName')
    return !title || title.includes(site) ? (title || site) : `${title} - ${site}`
  },
  twitterCard: 'summary_large_image'
})

// Nuxt UI's own strings (close buttons, etc.) and its `dir` for RTL-aware components.
const uiLocale = computed(() => (locale.value === 'ar' ? ar : en))
</script>

<template>
  <UApp :locale="uiLocale">
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
  </UApp>
</template>
