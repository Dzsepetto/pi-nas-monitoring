import './TopBar.css'

function Topbar({ title, subtitle, children }) {
  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        {children}
      </div>
    </header>
  )
}

export default Topbar