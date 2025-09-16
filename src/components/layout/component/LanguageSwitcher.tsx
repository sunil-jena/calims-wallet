'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const SUPPORTED = ['en', 'zh', 'pt', 'es', 'fr', 'ja'] as const;
const isRTL = (lng: string) => ['ar', 'he', 'fa', 'ur'].includes(lng);

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = React.useMemo(
    () =>
      SUPPORTED.map((code) => ({
        code,
        name: t(`languages.${code}`),
      })),
    [t]
  );

  const applyDomLang = (lng: string) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lng;
      document.documentElement.dir = isRTL(lng) ? 'rtl' : 'ltr';
    }
  };

  const persistLang = (lng: string) => {
    try {
      localStorage.setItem('i18nextLng', lng);
      localStorage.setItem('preferredLanguage', lng);
      document.cookie = `i18next=${lng}; path=/; max-age=31536000`; // 1y
    } catch { }
  };

  const handleLanguageChange = async (langCode: string) => {
    if (langCode === i18n.language) {
      setIsOpen(false);
      return;
    }
    await i18n.changeLanguage(langCode);
    persistLang(langCode);
    applyDomLang(langCode);
    setIsOpen(false);
  };

  const currentLabel =
    languages.find((l) => l.code === i18n.language)?.name ||
    t('languages.en', 'English');

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4" />
        <span>{currentLabel}</span>
      </button>

      {isOpen && (
        <div
          className="absolute bottom-full left-0 mb-2 w-44 rounded-lg border border-border bg-card shadow-lg py-2 z-50"
          role="listbox"
        >
          {languages.map((lang) => {
            const active = i18n.language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted ${active ? 'text-primary' : 'text-muted-foreground'
                  }`}
              >
                {lang.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
