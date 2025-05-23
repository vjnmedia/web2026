import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      fr: {
        translation: frTranslations
      }
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p']
    },
    keySeparator: '.',
    nsSeparator: ':',
    defaultNS: 'translation',
    fallbackNS: 'translation',
    load: 'languageOnly',
    preload: ['en', 'fr'],
    saveMissing: true,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn(`Missing translation key: ${key} for language: ${lng}`);
    }
  });

// Ensure translations are loaded before proceeding
i18n.on('initialized', () => {
  console.log('i18n initialized with language:', i18n.language);
  document.documentElement.lang = i18n.language;
});

// Handle language changes
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  document.documentElement.lang = lng;
  localStorage.setItem('language', lng);
});

// Log the loaded translations for debugging
console.log('Loaded translations:', {
  en: enTranslations,
  fr: frTranslations
});

export default i18n; 