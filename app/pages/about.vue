<script setup lang="ts">
const { t, locale } = useI18n()
const collection = useLocalizedCollection('about')

const { data: page } = await useAsyncData(
  () => `about-${locale.value}`,
  () => queryCollection(collection.value).first()
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

const title = computed(() => page.value?.seo?.title || page.value?.title)
const description = computed(() => page.value?.seo?.description || page.value?.description)

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

// Arabic pages reuse the English OG image (no Arabic font in the renderer).
defineOgImage('Portfolio', locale.value === 'ar'
  ? { headline: t('meta.ogHeadline'), title: t('meta.ogTitle'), description: t('meta.ogDescription') }
  : { headline: t('meta.ogHeadline'), title: title.value, description: description.value })
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: 'mx-0! text-start',
        description: 'mx-0! text-start',
        links: 'justify-start'
      }"
    >
      <UColorModeAvatar
        class="sm:rotate-4 sm:rtl:-rotate-4 size-36 rounded-lg ring ring-default ring-offset-3 ring-offset-bg"
        :light="global.picture?.light!"
        :dark="global.picture?.dark!"
        :alt="t('avatarAlt')"
      />
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <ContentRenderer :value="page" />
    </UPageSection>
  </UPage>
</template>
