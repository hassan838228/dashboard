module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'es', 'fr'],
    localeDetection: true,
  },
  fallbackLng: {
    default: ['en'],
    ar: ['en'],
    es: ['en'],
    fr: ['en'],
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
}