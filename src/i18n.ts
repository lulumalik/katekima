import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import id from './locales/id.json'

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'en', // Ambil dari localStorage atau default 'en'
  fallbackLocale: 'en', // Jika bahasa tidak ditemukan, gunakan 'en'
  messages: { en, id },
})

export default i18n
