import React, { createContext, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Tts from 'react-native-tts';
import { setItem, getItem } from "../services/storage";
const DEFAULT_CONSENT = { name: "", language: "", consented: 0, filePath: "" };
import uuid from 'react-native-uuid';
export const ConsentContext = createContext();
const KEY = 'consents'
export default function ConsentProvider({ children }) {
    const [consent, setConsent] = useState(DEFAULT_CONSENT);
    const [consentList, setConsentList] = useState([]);
    const { i18n } = useTranslation();

    useEffect(() => {
        getItem(KEY).then(result => {
            setConsentList(result);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const updateConsent = (key, value) => {
        const newValue = { [key]: value }
        setConsent({ ...consent, ...newValue })
        if (key === "language") {
            i18n.changeLanguage(value);
            Tts.setDefaultLanguage(value);
        }
    }
    const addConsent = async (newValue) => {
        try {
            const prevConsents = [...consentList] || [];
            const newConsent = { ...newValue };
            newConsent.id = uuid.v4();
            prevConsents.push(newConsent);
            let response = await setItem(prevConsents).then(result => {
                if (result.success) {
                    refreshForm();
                    setConsentList(prevConsents);
                    return true;
                }
                return false

            }).catch(error => {
                throw error;
                console.log(error);
            })
            return response;

        } catch (error) {
            throw error;
        }


    }
    const refreshForm = () => {
        setConsent(DEFAULT_CONSENT)
    }
    return (
        <ConsentContext.Provider value={{ consent, updateConsent, addConsent, consentList }}>
            {children}
        </ConsentContext.Provider>
    )

}
export const useConsent = () => useContext(ConsentContext);

