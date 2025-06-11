import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, options?: any) => string;
  changeLanguage: (language: string) => void;
}

const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  changeLanguage: async () => {}
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [language, setLanguageState] = useState<string>(i18n.language || 'en');
  const { t } = useTranslation();

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      setLanguageState(lng);
      localStorage.setItem('language', lng);
      document.documentElement.lang = lng;
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  useEffect(() => {
    // Wait for i18n to be initialized
    const handleInitialized = () => {
      console.log('i18n initialized in provider');
      setIsInitialized(true);
      
      // Load saved language preference
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && savedLanguage !== language) {
        changeLanguage(savedLanguage);
      }
    };

    if (i18n.isInitialized) {
      handleInitialized();
    } else {
      i18n.on('initialized', handleInitialized);
    }

    // Listen for language changes
    const handleLanguageChanged = (lng: string) => {
      console.log('Language changed in context:', lng);
      setLanguageState(lng);
      document.documentElement.lang = lng;
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('initialized', handleInitialized);
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
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
