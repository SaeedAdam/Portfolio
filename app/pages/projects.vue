<script setup lang="ts">
const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').order('stem', 'ASC').all()
})

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { headline: 'Saeed Adam', title, description })
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex flex-wrap items-center gap-2"
        >
          <UButton
            v-for="(link, index) in page.links"
            :key="index"
            v-bind="link"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          :to="project.url"
          target="_blank"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last'
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              {{ project.date }}
            </span>
          </template>
          <template #footer>
            <div class="flex flex-wrap gap-1.5">
              <UBadge
                v-for="tag in project.tags"
                :key="tag"
                :label="tag"
                color="neutral"
                variant="subtle"
              />
            </div>
            <span class="mt-3 text-sm text-primary flex items-center gap-1">
              <UIcon
                name="i-simple-icons-github"
                class="size-4"
              />
              View source on GitHub
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </span>
          </template>
          <img
            :src="project.image"
            :alt="`Screenshot of ${project.title}`"
            loading="lazy"
            class="object-cover object-top w-full h-48 rounded-lg ring ring-default"
          >
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
