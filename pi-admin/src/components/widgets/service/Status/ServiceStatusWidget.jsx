import { useEffect, useState } from 'react'
import {getServicesStatus} from '../../../../api/systemApi'
import ServiceStatusList from '../../../elements/ServiceStatusList/ServiceStatusList'
import './ServiceStatusWidget.css'

function ServiceStatusWidget() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadServices() {
    try {
      setLoading(true)
      setError(null)

      const data = await getServicesStatus()
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

  if (error) {
    return <section className="panel error">{error}</section>
  }

  return (
    <section className="service-status-widget">
      <div className="widget-header">
        <h2>Service státuszok</h2>

        <button onClick={loadServices} disabled={loading}>
          {loading ? 'Frissítés...' : 'Frissítés'}
        </button>
      </div>

      <ServiceStatusList services={services} />
    </section>
  )
}

export default ServiceStatusWidget