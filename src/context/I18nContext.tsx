import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { dict, type Lang } from '../i18n'
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof dict)['en'] }
const I18nContext = createContext<Ctx>({ lang: 'en', setLang: () => {}, t: dict.en })
const KEY = 'ct_lang'
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem(KEY) as Lang) || 'en')
  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang)
    } catch {}
  }, [lang])
  const value = useMemo(() => ({ lang, setLang, t: dict[lang] }), [lang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
export const useI18n = () => useContext(I18nContext)
