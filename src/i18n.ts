import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      fr: {
        translation: frTranslation
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
    saveMissing: false,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn(`Missing translation key: ${key} for language: ${lng}`);
    }
  });

// These lines are no longer needed as translations are loaded synchronously
// const loadTranslations = async () => {
//   try {
//     const [enTranslations, frTranslations] = await Promise.all([
//       import('./locales/en.json'),
//       import('./locales/fr.json')
//     ]);

//     i18n.addResourceBundle('en', 'translation', enTranslations.default, true, true);
//     i18n.addResourceBundle('fr', 'translation', frTranslations.default, true, true);

//     console.log('Translations loaded successfully');
//   } catch (error) {
//     console.error('Error loading translations:', error);
//   }
// };

// loadTranslations();

// Ensure translations are loaded before proceeding
i18n.on('initialized', () => {
  console.log('i18n initialized with language:', i18n.language);
  console.log('Available resources:', i18n.getResourceBundle('en', 'translation'));
  console.log('Slider translations:', i18n.getResourceBundle('en', 'translation')?.slider);
  document.documentElement.lang = i18n.language;
});

// Handle language changes
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  document.documentElement.lang = lng;
  localStorage.setItem('language', lng);
});

export default i18n; 