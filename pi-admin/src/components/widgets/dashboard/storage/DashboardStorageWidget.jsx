import { useEffect, useState } from 'react'
import { getDashboardStorage } from '../../../../api/dashboardApi'
import DashboardStorageCard from '../../../elements/DashboardStorageCard/DashboardStorageCard'
import './DashboardStorageWidget.css'

function DashboardStorageWidget() {
  const [drives, setDrives] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadStorage() {
    try {
      setLoading(true)
      setError(null)

      const data = await getDashboardStorage()
      setDrives(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStorage()
  }, [])

  if (error) {
    return <section className="panel error">{error}</section>
  }

  return (
    <section>
      <div className="widget-header">
        <h2>Storage</h2>

        <button onClick={loadStorage} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="dashboard-storage-grid">
        {drives.map((drive) => (
          <DashboardStorageCard
            key={drive.uuid}
            drive={drive}
          />
        ))}
      </div>
    </section>
  )
}

export default DashboardStorageWidget