// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Inline resources (you can later move to /public/locales/* if you prefer)
const resources = {
    en: {
        translation: {
            languages: { en: 'English', zh: '中文', pt: 'Português', es: 'Español', fr: 'Français', ja: '日本語' },
            header: {
                insurance: {
                    link: { title: 'Pay Link' },
                    partners: { title: 'Pay Partners' },
                    claim: { title: 'Pay Claims' }
                }
            }
        }
    },
    zh: { translation: { languages: { en: '英语', zh: '中文', pt: '葡萄牙语', es: '西班牙语', fr: '法语', ja: '日语' } } },
    pt: { translation: { languages: { en: 'Inglês', zh: 'Chinês', pt: 'Português', es: 'Espanhol', fr: 'Francês', ja: 'Japonês' } } },
    es: { translation: { languages: { en: 'Inglés', zh: 'Chino', pt: 'Portugués', es: 'Español', fr: 'Francés', ja: 'Japonés' } } },
    fr: { translation: { languages: { en: 'Anglais', zh: 'Chinois', pt: 'Portugais', es: 'Espagnol', fr: 'Français', ja: 'Japonais' } } },
    ja: { translation: { languages: { en: '英語', zh: '中国語', pt: 'ポルトガル語', es: 'スペイン語', fr: 'フランス語', ja: '日本語' } } },
};

if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .use(LanguageDetector) // browser-only; on server it no-ops
        .init({
            resources,
            fallbackLng: 'en',
            supportedLngs: ['en', 'zh', 'pt', 'es', 'fr', 'ja'],
            defaultNS: 'translation',
            ns: ['translation'],
            debug: false,
            interpolation: {
                escapeValue: false, // react already escapes
            },
            detection: {
                order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
                caches: ['localStorage'],
            },
            returnNull: false,
        });
}

export default i18n;
