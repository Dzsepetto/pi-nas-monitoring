import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getServicesStatus } from '../../../../api/systemApi'
import ServiceStatusTile from '../../../elements/Service/Tile/ServiceStatusTile'

import './ServiceStatusTileWidget.css'

function ServiceStatusTileWidget() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { t } = useTranslation()

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
    <section className="service-status-tile-widget">
      <div className="widget-header">
        <h2>{t('service.card-title')}</h2>

        <button onClick={loadServices} disabled={loading}>
          {loading ? 'Frissítés...' : t('service.refresh')}
        </button>
      </div>

      <div className="service-tile-grid">
        {services.map((service) => (
          <ServiceStatusTile
            key={service.name}
            service={service}
            onRefresh={loadServices}
          />
        ))}
      </div>
    </section>
  )
}

export default ServiceStatusTileWidget