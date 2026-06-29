import './StorageSpaceCard.css'

function StorageSpaceCard({ storage }) {
  const percent = storage.usedPercent ?? 0

  return (
    <section className="panel storage-space-card">
      <div className="storage-space-chart">
        <svg viewBox="0 0 120 120">
          <circle
            className="chart-bg"
            cx="60"
            cy="60"
            r="52"
          />

          <circle
            className="chart-progress"
            cx="60"
            cy="60"
            r="52"
            style={{
              strokeDasharray: `${percent * 3.268} 326.8`
            }}
          />

          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {percent.toFixed(0)}%
          </text>
        </svg>
      </div>

      <div className="storage-space-info">
        <h3>{storage.displayName}</h3>

        <div>
          <span>Használt</span>
          <strong>{storage.usedText}</strong>
        </div>

        <div>
          <span>Szabad</span>
          <strong>{storage.freeText}</strong>
        </div>

        <div>
          <span>Összes</span>
          <strong>{storage.totalText}</strong>
        </div>
      </div>
    </section>
  )
}

export default StorageSpaceCard