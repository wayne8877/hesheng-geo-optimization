import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { LANGUAGES } from './constants';
import { Language, Translation } from './types';
import { en } from './locales/en';
import { zh } from './locales/zh';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { ja } from './locales/ja';
import { ko } from './locales/ko';

interface LanguageContextType {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCALES: Record<string, Translation> = {
  EN: en,
  ZH: zh,
  ES: es,
  FR: fr,
  JA: ja,
  KO: ko
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0]); 

  const t = useMemo(() => {
      return LOCALES[currentLang.code] || LOCALES.EN;
  }, [currentLang.code]);

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage: setCurrentLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};