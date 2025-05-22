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
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: true, // Enable debug mode to see what's happening
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p']
    },
    keySeparator: '.', // Use dot notation for nested keys
    nsSeparator: ':', // Use colon for namespace separation
    defaultNS: 'translation',
    fallbackNS: 'translation',
    load: 'languageOnly', // Only load the language, not the region
    preload: ['en', 'fr'], // Preload both languages
    saveMissing: true, // Save missing keys
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn(`Missing translation key: ${key} for language: ${lng}`);
    }
  });

// Log the loaded translations for debugging
console.log('Loaded translations:', {
  en: enTranslations,
  fr: frTranslations
});

export default i18n; 