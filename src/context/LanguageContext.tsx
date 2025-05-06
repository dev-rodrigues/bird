import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '@/i18n';

type Language = 'en' | 'pt';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => {
        localStorage.setItem('app-language', 'en');
    },
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const storedLang = localStorage.getItem('app-language') as Language;
        return storedLang || 'en';
    });

    const handleSetLanguage = (lang: Language) => {
        void i18n.changeLanguage(lang);
        setLanguage(lang);
        localStorage.setItem('app-language', lang);
    };

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};