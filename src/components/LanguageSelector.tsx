import React from 'react'
import { useI18n } from '../context/I18nContext'
export default function LanguageSelector() {
  const { lang, setLang } = useI18n()
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 12, color: '#666' }}>Lang</span>
      <select
        aria-label="Language selector"
        value={lang}
        onChange={(e) => setLang(e.target.value as any)}
        className="select"
        style={{ height: 32 }}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="hi">हिंदी</option>
      </select>
    </label>
  )
}
