'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import EN from '../locales/en.json'
import VI from '../locales/vi.json'
export type Language = 'vi' | 'en';

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextProps>({
  language: 'vi',
  setLanguage: () => {},
  t: (key) => key,
});

const translations: Record<Language, Record<string, string>> = {
  vi : VI,
  en : EN
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const lang = (typeof window !== 'undefined') ? (localStorage.getItem('language') as Language) : 'vi';
    setLanguage(lang || 'vi');
  }, []);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const data = await import(`../locales/${language}.json`);
        setTranslations(data.default || {});
      } catch {
        setTranslations({});
      }
      setIsReady(true);
    }
    loadTranslations();
    if (typeof window !== 'undefined') localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => translations[key] || key;

  if (!isReady) return null;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
