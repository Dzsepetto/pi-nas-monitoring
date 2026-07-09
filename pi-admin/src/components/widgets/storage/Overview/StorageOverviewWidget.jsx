import { useEffect, useState } from 'react'
import { getStorageOverview } from '../../../../api/overviewApi'
import StorageOverviewCard from '../../../elements/StorageOverview/StorageOverviewCard'
import './StorageOverviewWidget.css'
import { useTranslation } from 'react-i18next'

function StorageOverviewWidget() {
  const [drives, setDrives] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {t} = useTranslation()

  async function loadDrives() {
    try {
      setLoading(true)
      setError(null)

      const data = await getStorageOverview()
      setDrives(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDrives()
  }, [])

  if (error) {
    return <section className="panel error">{error}</section>
  }

  return (
    <section>
      <div className="widget-header">
        <h2>{t('storage.card-title')}</h2>

        <button onClick={loadDrives} disabled={loading}>
          {loading ? 'Frissítés...' : 'Frissítés'}
        </button>
      </div>

      <div className="storage-overview-grid">
        {drives.map((drive) => (
          <StorageOverviewCard key={drive.uuid} drive={drive} />
        ))}
      </div>
    </section>
  )
}

export default StorageOverviewWidget