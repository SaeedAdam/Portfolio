<script setup lang="ts">
import type { IndexEnCollectionItem } from '@nuxt/content'

const { t } = useI18n()
const { global } = useAppConfig()
const socialLinks = useSocialLinks()

defineProps<{
  page: IndexEnCollectionItem
}>()

const reveal = {
  initial: { scale: 1.1, opacity: 0, filter: 'blur(20px)' },
  animate: { scale: 1, opacity: 1, filter: 'blur(0px)' }
}
</script>

<template>
  <UPageHero
    :ui="{
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md max-w-lg mx-auto',
      links: 'mt-4 flex-col justify-center items-center'
    }"
  >
    <template #headline>
      <Motion
        v-bind="reveal"
        :transition="{ duration: 0.6, delay: 0.1 }"
      >
        <UColorModeAvatar
          class="size-24 ring ring-default ring-offset-3 ring-offset-bg"
          :light="global.picture?.light!"
          :dark="global.picture?.dark!"
          :alt="t('avatarAlt')"
        />
      </Motion>
    </template>

    <template #title>
      <Motion
        v-bind="reveal"
        :transition="{ duration: 0.6, delay: 0.1 }"
      >
        {{ page.title }}
      </Motion>
    </template>

    <template #description>
      <Motion
        v-bind="reveal"
        :transition="{ duration: 0.6, delay: 0.3 }"
      >
        {{ page.description }}
      </Motion>
    </template>

    <template #links>
      <Motion
        v-bind="reveal"
        :transition="{ duration: 0.6, delay: 0.5 }"
        class="flex flex-col items-center gap-3"
      >
        <div
          v-if="global.available"
          class="flex items-center gap-2 text-sm text-success"
        >
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full rounded-full bg-success opacity-75 animate-ping" />
            <span class="relative inline-flex size-2 scale-90 rounded-full bg-success" />
          </span>
          {{ t('hero.available') }}
        </div>
        <div
          v-if="page.hero.links"
          class="flex flex-wrap items-center justify-center gap-2"
        >
          <UButton
            v-for="(link, index) in page.hero.links"
            :key="index"
            v-bind="link"
          />
        </div>
      </Motion>

      <div class="gap-x-4 inline-flex mt-4">
        <Motion
          v-for="(link, index) of socialLinks"
          :key="index"
          v-bind="reveal"
          :transition="{ duration: 0.6, delay: 0.5 + index * 0.1 }"
        >
          <UButton
            v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }"
          />
        </Motion>
      </div>
    </template>
  </UPageHero>
</template>
