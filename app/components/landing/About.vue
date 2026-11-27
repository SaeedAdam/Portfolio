<script setup lang="ts">
import type { IndexEnCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexEnCollectionItem
}>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <UPageSection
    :title="page.about.title"
    :description="page.about.description"
    :ui="{
      container: 'p-0!',
      title: 'text-start text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-start mt-3 text-sm sm:text-base text-muted whitespace-pre-line',
      links: 'justify-start mt-4'
    }"
  >
    <template #links>
      <UButton
        :label="t('about.more')"
        :to="localePath('/about')"
        color="neutral"
        variant="link"
        trailing-icon="i-lucide-arrow-right"
        class="px-0"
        :ui="{ trailingIcon: 'rtl:-scale-x-100' }"
      />
    </template>
  </UPageSection>
</template>
