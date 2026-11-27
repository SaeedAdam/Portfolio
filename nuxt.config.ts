// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/i18n'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://saeedadam.com',
    name: 'Saeed Adam'
  },

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  ui: {
    eslint: {
      rules: {
        'no-unknown-classes': 'error',
        'no-conflicting-classes': 'error',
        'no-palette-colors': 'error'
      }
    }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [{
      // Arabic subset only; Latin falls back to Public Sans (see main.css).
      name: 'IBM Plex Sans Arabic',
      provider: 'google',
      weights: [400, 500, 600, 700],
      subsets: ['arabic']
    }]
  },

  i18n: {
    baseUrl: 'https://saeedadam.com',
    defaultLocale: 'en',
    // English stays at /, Arabic lives under /ar.
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'ar', language: 'ar-SA', name: 'العربية', dir: 'rtl', file: 'ar.json' }
    ],
    // No automatic redirect: on a static site it would flash the English page first,
    // and it can hide the English version from crawlers. Visitors use the switcher.
    detectBrowserLanguage: false
  },

  ogImage: {
    zeroRuntime: true
  },

  prerender: {
    routes: [
      '/',
      '/ar'
    ],
    crawlLinks: true
  }
})
