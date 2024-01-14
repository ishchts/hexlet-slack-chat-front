import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/resources.js';

const i18n = i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
