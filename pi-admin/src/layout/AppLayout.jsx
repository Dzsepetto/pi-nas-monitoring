import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import './style/appLayoutStyle.css'

function AppLayout() {
  return (
    <main className="app">
      <Sidebar />

      <section className="content">
        <Outlet />
      </section>
    </main>
  )
}

export default AppLayout