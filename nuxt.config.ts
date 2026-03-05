// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    contactEmail: process.env.CONTACT_EMAIL
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    preset: 'aws-amplify'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
})
