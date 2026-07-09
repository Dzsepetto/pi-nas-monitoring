import { useNavigate } from 'react-router-dom'
import './DashboardStorageCard.css'
import { useTranslation } from 'react-i18next'

function DashboardStorageCard({ drive }) {
  const navigate = useNavigate()
  const { t } = useTranslation()


  function openDetails() {
    navigate(`/storage/${drive.uuid}`)
  }
    function getHealthColor(value) {
        if (value >= 90) return '#22c55e'
        if (value >= 70) return '#f59e0b'
        return '#ef4444'
    }   
  return (
    <article
      className="dashboard-storage-card panel"
      onClick={openDetails}
    >
      <div className="dashboard-storage-header">
        <h3>{drive.displayName}</h3>

        <span className={drive.isMounted ? 'badge active' : 'badge inactive'}>
          {drive.isMounted ? 'Active' : 'Offline'}
        </span>
      </div>

      <div className="dashboard-storage-info">
        <div>
          <span>{t('dashboard.health')}</span>
         <strong style={{ color: getHealthColor(drive.healthPercent) }}>
            {drive.healthPercent ?? '-'}%
         </strong>
        </div>

        <div>
          <span>  {t('dashboard.space')}</span>
          <strong>{ 100- (drive.usedPercent?.toFixed(0)) ?? '-'}%</strong>
        </div>
      </div>
    </article>
  )
}

export default DashboardStorageCard