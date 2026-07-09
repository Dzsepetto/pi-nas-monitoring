import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n/i18n'
import './style/SettingsPage.css'

function SettingsPage() {
  const { t } = useTranslation()

  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'hu'
  )

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function handleLanguageChange(event) {
    const selectedLanguage = event.target.value

    setLanguage(selectedLanguage)
    localStorage.setItem('language', selectedLanguage)
    i18n.changeLanguage(selectedLanguage)
  }

  function handleThemeChange(event) {
    setTheme(event.target.value)
  }

  return (
    <main className="settings-page">
      <div className="settings-header">
        <h1>{t('settings.title')}</h1>
        <p>{t('settings.description')}</p>
      </div>

      <section className="settings-card">
        <div className="settings-row">
          <div>
            <h2>{t('settings.languageTitle')}</h2>
            <p>{t('settings.languageDescription')}</p>
          </div>

          <select className="settings-select" value={language} onChange={handleLanguageChange}>
            <option value="hu">{t('settings.hungarian')}</option>
            <option value="en">{t('settings.english')}</option>
          </select>
        </div>

        <div className="settings-row">
          <div>
            <h2>{t('settings.themeTitle')}</h2>
            <p>{t('settings.themeDescription')}</p>
          </div>

          <select className="settings-select" value={theme} onChange={handleThemeChange}>
            <option value="default">{t('settings.default')}</option>
            <option value="pink">{t('settings.pink')}</option>
          </select>
        </div>
      </section>
    </main>
  )
}

export default SettingsPage