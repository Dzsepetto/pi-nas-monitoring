import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStorageByUuid } from '../../../../api/overviewApi'
import './StorageDetailWidget.css'

function StorageDetailWidget() {
  const { uuid } = useParams()

  const [drive, setDrive] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadDrive() {
    try {
      setLoading(true)
      setError(null)

      const data = await getStorageByUuid(uuid)
      setDrive(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDrive()
  }, [uuid])

  if (error) {
    return <section className="panel error">{error}</section>
  }

  if (loading && !drive) {
    return <section className="panel">Betöltés...</section>
  }

  if (!drive) {
    return <section className="panel">Nincs adat.</section>
  }

  return (
    <section className="panel storage-detail-widget">
      <div className="widget-header">
        <h2>{drive.displayName}</h2>

        <button onClick={loadDrive} disabled={loading}>
          {loading ? 'Frissítés...' : 'Frissítés'}
        </button>
      </div>

      <div className="storage-detail-grid">
        <div>
          <span>Állapot</span>
          <strong>{drive.isMounted ? 'Active' : 'Not active'}</strong>
        </div>

        <div>
          <span>Eszköz</span>
          <strong>{drive.device || '-'}</strong>
        </div>

        <div>
          <span>Mount pont</span>
          <strong>{drive.mountPoint || '-'}</strong>
        </div>

        <div>
          <span>Használt tárhely</span>
          <strong>{drive.usedText || '-'}</strong>
        </div>

        <div>
          <span>Szabad tárhely</span>
          <strong>{drive.freeText || '-'}</strong>
        </div>

        <div>
          <span>Összes tárhely</span>
          <strong>{drive.totalText || '-'}</strong>
        </div>

        <div>
          <span>Kihasználtság</span>
          <strong>{drive.usedPercent?.toFixed(2) ?? '-'}%</strong>
        </div>

        <div>
          <span>Health</span>
          <strong>{drive.healthPercent ?? '-'}%</strong>
        </div>

        <div>
          <span>Hőmérséklet</span>
          <strong>{drive.temperatureC ?? '-'} °C</strong>
        </div>

        <div>
          <span>Üzemidő</span>
          <strong>{drive.powerOnHours ?? '-'} óra</strong>
        </div>

        <div>
          <span>Modell</span>
          <strong>{drive.model || '-'}</strong>
        </div>

        <div>
          <span>Sorozatszám</span>
          <strong>{drive.serialNumber || '-'}</strong>
        </div>

        <div>
          <span>Interfész</span>
          <strong>{drive.interface || '-'}</strong>
        </div>
      </div>
    </section>
  )
}

export default StorageDetailWidget