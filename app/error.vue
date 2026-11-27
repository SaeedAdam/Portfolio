<script setup lang="ts">
import type { NuxtError } from '#app'
import { ar, en } from '@nuxt/ui/locale'

defineProps<{
  error: NuxtError
}>()

const { t, locale } = useI18n()
const i18nHead = useLocaleHead({ dir: true, lang: true })

useHead({
  htmlAttrs: {
    lang: () => i18nHead.value.htmlAttrs.lang,
    dir: () => i18nHead.value.htmlAttrs.dir
  }
})

useSeoMeta({
  title: () => t('error.title'),
  description: () => t('error.description')
})

const uiLocale = computed(() => (locale.value === 'ar' ? ar : en))
</script>

<template>
  <UApp :locale="uiLocale">
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </UApp>
</template>
