<script setup lang="ts">
import type { IndexEnCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexEnCollectionItem
}>()

const { t } = useI18n()
const { global } = useAppConfig()
const toast = useToast()

// The form is posted to Netlify Forms. Netlify finds it in the prerendered
// HTML at deploy time (data-netlify + the hidden "form-name" field).
const FORM_NAME = 'contact'

const state = reactive({ name: '', email: '', subject: '', message: '', botField: '' })
const status = ref<'idle' | 'sending' | 'sent'>('idle')

async function onSubmit() {
  status.value = 'sending'
  try {
    const body = new URLSearchParams({
      'form-name': FORM_NAME,
      'name': state.name,
      'email': state.email,
      'subject': state.subject,
      'message': state.message,
      'bot-field': state.botField
    })
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    status.value = 'sent'
    Object.assign(state, { name: '', email: '', subject: '', message: '', botField: '' })
  } catch {
    status.value = 'idle'
    toast.add({
      title: t('contact.errorTitle'),
      // U+2066/U+2069 isolate the address so it stays left-to-right inside Arabic text.
      description: t('contact.errorBody', { email: `⁦${global.email}⁩` }),
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
  }
}
</script>

<template>
  <UPageSection
    id="contact"
    class="scroll-mt-24"
    :title="page.contact.title"
    :description="page.contact.description"
    :ui="{
      container: 'p-0! gap-6 sm:gap-8',
      title: 'text-start text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-start mt-2 text-sm sm:text-base lg:text-sm text-muted'
    }"
  >
    <div
      v-if="status === 'sent'"
      role="status"
      class="rounded-lg border border-default p-6 text-center"
    >
      <UIcon
        name="i-lucide-circle-check"
        class="size-8 text-success"
      />
      <p class="mt-2 font-medium text-highlighted">
        {{ t('contact.sentTitle') }}
      </p>
      <p class="mt-1 text-sm text-muted">
        {{ t('contact.sentBody') }}
      </p>
      <UButton
        class="mt-4"
        :label="t('contact.sendAnother')"
        color="neutral"
        variant="outline"
        @click="status = 'idle'"
      />
    </div>

    <form
      v-else
      :name="FORM_NAME"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      class="grid gap-4 sm:grid-cols-2"
      @submit.prevent="onSubmit"
    >
      <input
        type="hidden"
        name="form-name"
        :value="FORM_NAME"
      >
      <p class="hidden">
        <label>{{ t('contact.honeypot') }} <input
          v-model="state.botField"
          name="bot-field"
          tabindex="-1"
          autocomplete="off"
        ></label>
      </p>

      <UFormField
        :label="t('contact.name')"
        name="name"
        required
      >
        <UInput
          v-model="state.name"
          name="name"
          autocomplete="name"
          dir="auto"
          required
          class="w-full"
        />
      </UFormField>
      <UFormField
        :label="t('contact.email')"
        name="email"
        required
      >
        <UInput
          v-model="state.email"
          name="email"
          type="email"
          autocomplete="email"
          dir="ltr"
          required
          class="w-full"
        />
      </UFormField>
      <UFormField
        :label="t('contact.subject')"
        name="subject"
        class="sm:col-span-2"
      >
        <UInput
          v-model="state.subject"
          name="subject"
          dir="auto"
          class="w-full"
        />
      </UFormField>
      <UFormField
        :label="t('contact.message')"
        name="message"
        required
        class="sm:col-span-2"
      >
        <UTextarea
          v-model="state.message"
          name="message"
          :rows="5"
          dir="auto"
          required
          class="w-full"
        />
      </UFormField>
      <div class="sm:col-span-2 flex flex-wrap items-center gap-3">
        <UButton
          type="submit"
          :label="t('contact.send')"
          icon="i-lucide-send"
          :ui="{ leadingIcon: 'rtl:-scale-x-100' }"
          :loading="status === 'sending'"
        />
        <span class="text-sm text-muted">
          {{ t('contact.orEmail') }}
          <ULink
            :to="`mailto:${global.email}`"
            dir="ltr"
            class="text-primary"
          >{{ global.email }}</ULink>
        </span>
      </div>
    </form>
  </UPageSection>
</template>
