<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.experience.title"
    :ui="{
      container: 'p-0! gap-4 sm:gap-6',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium'
    }"
  >
    <ol class="relative border-s border-default ms-1.5 flex flex-col gap-6">
      <Motion
        v-for="(item, index) in page.experience.items"
        :key="index"
        as="li"
        :initial="{ opacity: 0, transform: 'translateY(20px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 * index }"
        :in-view-options="{ once: true }"
        class="ps-6 relative"
      >
        <span
          class="absolute -inset-s-1.5 top-1.5 size-3 rounded-full ring-4 ring-bg"
          :class="index === 0 ? 'bg-primary' : 'bg-accented'"
        />
        <p class="text-xs text-muted">
          {{ item.date }}
        </p>
        <h3 class="mt-1 font-medium text-highlighted">
          {{ item.position }}
          <span class="text-muted font-normal"> at </span>
          <ULink
            v-if="item.company.url"
            :to="item.company.url"
            target="_blank"
            class="text-primary"
          >
            {{ item.company.name }}
          </ULink>
          <span
            v-else
            class="text-primary"
          >{{ item.company.name }}</span>
        </h3>
        <p
          v-if="item.summary"
          class="mt-1 text-sm text-muted text-pretty"
        >
          {{ item.summary }}
        </p>
      </Motion>
    </ol>
  </UPageSection>
</template>
