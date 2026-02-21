<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="handleSubmit">
    <div class="grid grid-cols-2 gap-4">
      <UFormField label="Full Name" name="name">
        <UInput v-model="state.name" placeholder="So we know who we’re talking to" class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="state.email" type="email" placeholder="Where we can reach you" class="w-full" />
      </UFormField>
    </div>

    <UFormField label="Subject" name="subject">
      <UInput v-model="state.subject" placeholder="What's this about?" class="w-full" />
    </UFormField>

    <UFormField label="Message" name="message">
      <UTextarea v-model="state.message" placeholder="Tell us a bit about your project or question" :rows="5" class="w-full" />
    </UFormField>

    <UAlert v-if="serverError" color="error" variant="soft" :description="serverError" icon="i-lucide-circle-alert" />

    <UButton type="submit" :loading="loading" trailing-icon="i-lucide-send" label="Send Message" />
  </UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

interface ContactState {
  name: string
  email: string
  subject: string
  message: string
}

const toast = useToast()

const state = reactive<ContactState>({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const loading = ref(false)
const serverError = ref('')

const validate = (data: Partial<ContactState>): FormError[] => {
  const errors: FormError[] = []
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!data.name?.trim())
    errors.push({ name: 'name', message: 'Name is required.' })

  if (!data.email?.trim())
    errors.push({ name: 'email', message: 'Email is required.' })
  else if (!emailRe.test(data.email))
    errors.push({ name: 'email', message: 'Please enter a valid email.' })

  if (!data.subject?.trim())
    errors.push({ name: 'subject', message: 'Subject is required.' })

  if (!data.message?.trim())
    errors.push({ name: 'message', message: 'Message is required.' })

  return errors
}

async function handleSubmit(event: FormSubmitEvent<ContactState>) {
  serverError.value = ''
  loading.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: event.data,
    })
    toast.add({
      title: 'Message sent!',
      description: 'We\'ll get back to you soon.',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    Object.assign(state, { name: '', email: '', subject: '', message: '' })
  } catch (err: unknown) {
    const fetchError = err as { data?: { message?: string } }
    serverError.value = fetchError?.data?.message ?? 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
