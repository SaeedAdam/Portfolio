<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.about.title"
    :description="page.about.description"
    :ui="{
      container: 'p-0!',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-3 text-sm sm:text-base text-muted whitespace-pre-line',
      links: 'justify-start mt-4'
    }"
  >
    <template #links>
      <UButton
        label="More about me"
        to="/about"
        color="neutral"
        variant="link"
        trailing-icon="i-lucide-arrow-right"
        class="px-0"
      />
    </template>
  </UPageSection>
</template>
