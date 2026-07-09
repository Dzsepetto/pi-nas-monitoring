import './StorageOverviewCard.css'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function StorageOverviewCard({ drive }) {
  const navigate = useNavigate() 
  const {t} = useTranslation()
  const usedPercent = drive.usedPercent ?? 0
  const healthPercent = drive.healthPercent ?? null

  function getHealthColor(value) {
    if (value === null || value === undefined) return '#64748b'
    if (value >= 90) return '#22c55e'
    if (value >= 70) return '#f59e0b'
    return '#ef4444'
  }

  function openDetails() {
    console.log(`'EZ a uuid: ${drive.uuid}'`)
    navigate(`/storage/${drive.uuid}`)
  }

  function getStatusText() {
    if (!drive.isConnected) return 'Not connected'
    if (!drive.isMounted) return 'Not mounted'
    return 'Active'
  }

  return (
    <section className="panel storage-overview-card clickable" onClick={openDetails}>
      <div className="storage-overview-header">
        <div>
          <h3>{drive.displayName}</h3>
          <p>{drive.mountPoint || drive.device || 'No device'}</p>
        </div>

        <span className={drive.isMounted ? 'badge active' : 'badge inactive'}>
          {getStatusText()}
        </span>
      </div>

      <div className="storage-overview-main">
        <div className="storage-overview-chart">
          <svg viewBox="0 0 120 120">
            <circle className="chart-bg" cx="60" cy="60" r="52" />

            <circle
              className="chart-progress"
              cx="60"
              cy="60"
              r="52"
              style={{
                strokeDasharray: `${usedPercent * 3.268} 326.8`
              }}
            />

            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {usedPercent.toFixed(0)}%
            </text>
          </svg>

          <span>Tárhely</span>
        </div>

        <div className="storage-overview-info">
          <div>
            <span>Használt</span>
            <strong>{drive.usedText || '-'}</strong>
          </div>

          <div>
            <span>Szabad</span>
            <strong>{drive.freeText || '-'}</strong>
          </div>

          <div>
            <span>Összes</span>
            <strong>{drive.totalText || '-'}</strong>
          </div>

          <div>
            <span>Health</span>
            <strong style={{ color: getHealthColor(healthPercent) }}>
              {healthPercent !== null ? `${healthPercent}%` : 'N/A'}
            </strong>
          </div>

          <div>
            <span>Hőmérséklet</span>
            <strong>
              {drive.temperatureC !== null ? `${drive.temperatureC} °C` : 'N/A'}
            </strong>
          </div>

          <div>
            <span>Üzemidő</span>
            <strong>
              {drive.powerOnHours !== null ? `${drive.powerOnHours} óra` : 'N/A'}
            </strong>
          </div>

          <div>
            <span>Eszköz</span>
            <strong>{drive.device || '-'}</strong>
          </div>

          <div>
            <span>Modell</span>
            <strong>{drive.model || '-'}</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorageOverviewCard