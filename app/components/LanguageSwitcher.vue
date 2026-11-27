<script setup lang="ts">
const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const target = computed(() => (locale.value === 'ar' ? 'en' : 'ar'))
</script>

<template>
  <!--
    :locale="false" stops Nuxt UI's link from auto-localizing the href. Without it, the
    English path ("/projects") gets re-prefixed with the current locale ("/ar/projects")
    and the switcher can never leave Arabic.
  -->
  <UButton
    :to="switchLocalePath(target)"
    :locale="false"
    :label="t('lang.switchLabel')"
    :lang="target"
    :hreflang="target"
    :aria-label="t('lang.switchAria')"
    color="neutral"
    variant="ghost"
    size="sm"
    class="rounded-full font-medium"
  />
</template>
