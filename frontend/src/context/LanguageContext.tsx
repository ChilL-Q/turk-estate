"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import ru from '../i18n/ru.json';
import tr from '../i18n/tr.json';

const dictionaries: Record<string, Record<string, any>> = {
  en, ru, tr
};

type LanguageContextType = {
  locale: string;
  setLocale: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('locale');
    if (saved && dictionaries[saved]) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (lang: string) => {
    setLocaleState(lang);
    localStorage.setItem('locale', lang);
  };

  const t = (path: string): string => {
    if (!mounted) {
       let value: any = dictionaries['en'];
       const keys = path.split('.');
       for (const key of keys) {
         if (value === undefined) return path;
         value = value[key];
       }
       return (typeof value === 'string' ? value : path);
    }

    const keys = path.split('.');
    let value: any = dictionaries[locale];
    for (const key of keys) {
      if (value === undefined) return path;
      value = value[key];
    }
    return (typeof value === 'string' ? value : path);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within a LanguageProvider");
  return context;
};
