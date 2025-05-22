import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, options?: any) => string;
  changeLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(i18n.language || 'en');
  const { t } = useTranslation();

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      setLanguageState(lng);
      localStorage.setItem('language', lng);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== language) {
      changeLanguage(savedLanguage);
    }

    // Listen for language changes
    const handleLanguageChanged = (lng: string) => {
      setLanguageState(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
