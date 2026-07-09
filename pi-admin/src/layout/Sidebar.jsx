import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import './style/sideBarStyle.css'

function Sidebar() {
  const { logout } = useAuth()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>{t('layout.title')}</h2>

        <button
          className="hamburger-button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={t('layout.openMenu')}
        >
          ☰
        </button>
      </div>

      <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
        <nav>
          <NavLink to="/dashboard" onClick={closeMenu}>
            {t('layout.dashboard')}
          </NavLink>

          <NavLink to="/services" onClick={closeMenu}>
            {t('layout.services')}
          </NavLink>

          <NavLink to="/storage" onClick={closeMenu}>
            {t('layout.storage')}
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <NavLink
            to="/settings"
            className="settings-button"
            onClick={closeMenu}
          >
            {t('layout.settings')}
          </NavLink>

          <button className="logout-button" onClick={logout}>
            {t('layout.logout')}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar