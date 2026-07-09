import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getStorageByUuid } from '../../../../api/overviewApi'
import './StorageDetailWidget.css'

function StorageDetailWidget() {
  const { uuid } = useParams()
  const { t } = useTranslation()

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
    return <section className="panel">{t('storage.loading')}</section>
  }

  if (!drive) {
    return <section className="panel">{t('storage.noData')}</section>
  }

  return (
    <section className="panel storage-detail-widget">
      <div className="widget-header">
        <h2>{drive.displayName}</h2>

        <button onClick={loadDrive} disabled={loading}>
          {loading ? t('storage.refreshing') : t('storage.refresh')}
        </button>
      </div>

      <div className="storage-detail-grid">
        <div>
          <span>{t('storage.health')}</span>
          <strong>
            {drive.isMounted ? t('storage.active') : t('storage.notActive')}
          </strong>
        </div>

        <div>
          <span>{t('storage.device')}</span>
          <strong>{drive.device || '-'}</strong>
        </div>

        <div>
          <span>{t('storage.mountPoint')}</span>
          <strong>{drive.mountPoint || '-'}</strong>
        </div>

        <div>
          <span>{t('storage.used')}</span>
          <strong>{drive.usedText || '-'}</strong>
        </div>

        <div>
          <span>{t('storage.free')}</span>
          <strong>{drive.freeText || '-'}</strong>
        </div>

        <div>
          <span>{t('storage.total')}</span>
          <strong>{drive.totalText || '-'}</strong>
        </div>

        <div>
          <span>{t('storage.usage')}</span>
          <strong>{drive.usedPercent?.toFixed(2) ?? '-'}%</strong>
        </div>

        <div>
          <span>{t('storage.health')}</span>
          <strong>
            {drive.healthPercent !== null && drive.healthPercent !== undefined
              ? `${drive.healthPercent}%`
              : t('storage.notAvailable')}
          </strong>
        </div>

        <div>
          <span>{t('storage.temperature')}</span>
          <strong>
            {drive.temperatureC !== null && drive.temperatureC !== undefined
              ? `${drive.temperatureC} °C`
              : t('storage.notAvailable')}
          </strong>
        </div>

        <div>
          <span>{t('storage.powerOnHours')}</span>
          <strong>
            {drive.powerOnHours !== null && drive.powerOnHours !== undefined
              ? `${drive.powerOnHours} ${t('storage.hours')}`
              : t('storage.notAvailable')}
          </strong>
        </div>

        <div>
          <span>{t('storage.model')}</span>
          <strong>{drive.model || '-'}</strong>
        </div>

        <div>
          <span>{t('storage.serialNumber')}</span>
          <strong>{drive.serialNumber || '-'}</strong>
        </div>

        <div>
          <span>{t('storage.interface')}</span>
          <strong>{drive.interface || '-'}</strong>
        </div>
      </div>
    </section>
  )
}

export default StorageDetailWidget