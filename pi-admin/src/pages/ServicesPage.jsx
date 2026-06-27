import { useEffect, useState } from 'react'
import Topbar from '../components/TopBar/Topbar'
import ServiceStatusList from '../components/ServiceStatusList/ServiceStatusList'
import { getServicesStatus } from '../api/systemApi'
import { useAuth } from '../hooks/useAuth'

function ServicesPage() {
  const { token, logout } = useAuth()

  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadServices() {
    try {
      setLoading(true)
      setError(null)

      const data = await getServicesStatus(token)
      setServices(data.services)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  return (
    <>
      <Topbar
        title="Szolgáltatások"
        subtitle="Tailscale, Samba és hd-idle állapot"
      >
        <button onClick={loadServices} disabled={loading}>
          {loading ? 'Frissítés...' : 'Frissítés'}
        </button>
      </Topbar>

      {error && (
        <section className="panel error">
          {error}
        </section>
      )}

      <ServiceStatusList services={services} />
    </>
  )
}

export default ServicesPage