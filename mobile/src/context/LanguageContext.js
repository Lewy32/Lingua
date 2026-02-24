import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLanguageById, languages } from '../data/languages';

const LanguageContext = createContext();

const STORAGE_KEY = '@lingua_selected_language';

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language on mount
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedId = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedId) {
        const language = getLanguageById(savedId);
        if (language && language.isActive) {
          setSelectedLanguage(language);
        }
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectLanguage = async (languageId) => {
    try {
      const language = getLanguageById(languageId);
      if (language && language.isActive) {
        await AsyncStorage.setItem(STORAGE_KEY, languageId);
        setSelectedLanguage(language);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving language:', error);
      return false;
    }
  };

  const clearLanguage = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setSelectedLanguage(null);
    } catch (error) {
      console.error('Error clearing language:', error);
    }
  };

  // Get text direction for current language
  const textDirection = selectedLanguage?.textDirection || 'ltr';
  const isRTL = textDirection === 'rtl';

  // Get available languages
  const availableLanguages = languages.filter(l => l.isActive);
  const comingSoonLanguages = languages.filter(l => l.comingSoon);

  const value = {
    // State
    selectedLanguage,
    isLoading,
    hasSelectedLanguage: !!selectedLanguage,
    
    // Language properties
    languageId: selectedLanguage?.id || null,
    languageName: selectedLanguage?.nameEnglish || null,
    languageNativeName: selectedLanguage?.nameNative || null,
    cuisineName: selectedLanguage?.cuisineName || null,
    textDirection,
    isRTL,
    
    // Lists
    availableLanguages,
    comingSoonLanguages,
    
    // Actions
    selectLanguage,
    clearLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
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

export default LanguageContext;
