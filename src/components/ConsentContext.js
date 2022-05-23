import React, { createContext, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Tts from 'react-native-tts';
const DEFAULT_CONSENT = { name: "", language: "", consented: false };
export const ConsentContext = createContext();

export default function ConsentProvider({ children }) {
    const [consent, setConsent] = useState(DEFAULT_CONSENT);
    const { i18n } = useTranslation();

    const updateConsent = (key, value) => {
        const newValue = { [key]: value }
        setConsent({ ...consent, ...newValue })
        if (key === "language") {
            i18n.changeLanguage(value);
            Tts.setDefaultLanguage(value);
        }
    }
    return (
        <ConsentContext.Provider value={{ consent, updateConsent }}>
            {children}
        </ConsentContext.Provider>
    )

}
export const useConsent = () => useContext(ConsentContext);

