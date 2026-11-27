<script setup lang="ts">
const { t, locale } = useI18n()
const pagesCollection = useLocalizedCollection('pages')
const projectsCollection = useLocalizedCollection('projects')

const { data: page } = await useAsyncData(
  () => `projects-page-${locale.value}`,
  () => queryCollection(pagesCollection.value).first()
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: projects } = await useAsyncData(
  () => `projects-${locale.value}`,
  () => queryCollection(projectsCollection.value).order('stem', 'ASC').all()
)

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
      :ui="{
        title: 'mx-0! text-start',
        description: 'mx-0! text-start',
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
            <!-- Tech names are English: dir=ltr keeps ".NET 6" from rendering as "NET 6." in RTL -->
            <div class="flex flex-wrap gap-1.5">
              <UBadge
                v-for="tag in project.tags"
                :key="tag"
                :label="tag"
                dir="ltr"
                color="neutral"
                variant="subtle"
              />
            </div>
            <span class="mt-3 text-sm text-primary flex items-center gap-1">
              <UIcon
                name="i-simple-icons-github"
                class="size-4"
              />
              {{ t('projects.viewSource') }}
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              />
            </span>
          </template>
          <img
            :src="project.image"
            :alt="t('projects.screenshot', { title: project.title })"
            loading="lazy"
            class="object-cover object-top w-full h-48 rounded-lg ring ring-default"
          >
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
