import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './style/sideBarStyle.css'

function Sidebar() {
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Pi Admin</h2>

        <button
          className="hamburger-button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label="Menü megnyitása"
        >
          ☰
        </button>
      </div>

      <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
        <nav>
          <NavLink to="/services" onClick={closeMenu}>
            Szolgáltatások
          </NavLink>

          <NavLink to="/storage" onClick={closeMenu}>
            Háttértárak
          </NavLink>
        </nav>

        <button className="logout-button" onClick={logout}>
          Kilépés
        </button>
      </div>
    </aside>
  )
}

export default Sidebar