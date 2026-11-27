<script setup lang="ts">
const { t } = useI18n()
const socialLinks = useSocialLinks()
const year = new Date().getFullYear()
</script>

<template>
  <UFooter
    class="z-10 bg-default"
    :ui="{ left: 'text-muted text-xs' }"
  >
    <template #left>
      {{ t('footer.credits', { year }) }}
    </template>

    <template #right>
      <UButton
        v-for="(link, index) of socialLinks"
        :key="index"
        v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
      />
    </template>
  </UFooter>
</template>
