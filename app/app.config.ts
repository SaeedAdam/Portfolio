export default defineAppConfig({
  global: {
    picture: {
      dark: '/images/avatar.jpg',
      light: '/images/avatar.jpg',
      alt: 'Portrait of Saeed Adam' // translated via `avatarAlt` in i18n/locales
    },
    email: 'sandeed70@gmail.com',
    // Shows an "Open to new opportunities" badge in the hero when true.
    // Off by default: your LinkedIn "Open to work" is set to recruiters only,
    // and this badge would be public (including to your current employer).
    available: false
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-16 sm:py-20 lg:py-24',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-base mx-auto max-w-2xl text-pretty sm:text-base text-muted'
      }
    }
  },
  footer: {
    // `id` picks the translated aria-label (`social.<id>` in i18n/locales); see useSocialLinks().
    links: [{
      'id': 'github',
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/SaeedAdam',
      'target': '_blank',
      'aria-label': 'Saeed Adam on GitHub'
    }, {
      'id': 'linkedin',
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://www.linkedin.com/in/saeedadam',
      'target': '_blank',
      'aria-label': 'Saeed Adam on LinkedIn'
    }, {
      'id': 'x',
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/SaeedAdam1',
      'target': '_blank',
      'aria-label': 'Saeed Adam on X'
    }, {
      'id': 'email',
      'icon': 'i-lucide-mail',
      'to': 'mailto:sandeed70@gmail.com',
      'aria-label': 'Email Saeed Adam'
    }]
  }
})
