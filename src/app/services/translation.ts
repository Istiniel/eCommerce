import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonTranslationEn from '../locales/en/common.json';
import commonTranslationRu from '../locales/ru/common.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: {
      common: commonTranslationEn,
    },
    ru: { common: commonTranslationRu },
  },
  debug: true,
  ns: ['common'],
  defaultNS: 'common',
});

export default i18n;
