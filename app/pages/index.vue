<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { headline: 'Saeed Adam', title: 'Senior Software Engineer', description })
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
