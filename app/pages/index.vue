<script setup lang="ts">
const { t, locale } = useI18n()
const collection = useLocalizedCollection('index')

const { data: page } = await useAsyncData(
  () => `index-${locale.value}`,
  () => queryCollection(collection.value).first()
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const title = computed(() => page.value?.seo?.title || page.value?.title)
const description = computed(() => page.value?.seo?.description || page.value?.description)

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

// The OG image renderer has no Arabic font, so the image is always English;
// og:title/og:description stay localized (platforms render those with their own fonts).
defineOgImage('Portfolio', { headline: t('meta.ogHeadline'), title: t('meta.ogTitle'), description: t('meta.ogDescription') })
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <UPageSection
      :ui="{
        container: 'pt-0! flex flex-col gap-12 lg:gap-16'
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
      <LandingContact :page />
    </UPageSection>
  </UPage>
</template>
