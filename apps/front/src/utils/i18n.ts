import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from '../assets/i18n/en.json';
import translationFR from '../assets/i18n/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    keySeparator: '.',
    fallbackLng: 'en',
    react: {
      useSuspense: false,
    },
    resources: {
      en: {
        translation: translationEN,
      },
      fr: {
        translation: translationFR,
      },
    },
  });

export default i18n;
