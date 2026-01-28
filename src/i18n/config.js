import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from './locales/fr.json'
import en from './locales/en.json'

const loadSavedTexts = () => {
  const savedTexts = localStorage.getItem('adminTexts')
  if (savedTexts) {
    try {
      const texts = JSON.parse(savedTexts)
      const currentFr = { ...fr }
      return {
        ...currentFr,
        home: {
          ...currentFr.home,
          ...texts.home
        },
        results: {
          ...currentFr.results,
          ...texts.results
        },
        robot: {
          ...currentFr.robot,
          ...texts.robot
        }
      }
    } catch (e) {
      return fr
    }
  }
  return fr
}

const initI18n = () => {
  if (!i18n.isInitialized) {
    const frWithSaved = loadSavedTexts()
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: {
          fr: { translation: frWithSaved },
          en: { translation: en }
        },
        fallbackLng: 'fr',
        debug: false,
        interpolation: {
          escapeValue: false
        },
        react: {
          useSuspense: false
        }
      })
  }
}

initI18n()

export default i18n

