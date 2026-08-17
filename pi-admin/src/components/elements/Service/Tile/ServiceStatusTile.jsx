import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import './ServiceStatusTile.css'

function ServiceStatusTile({ service, onRefresh }) {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)

  const tileRef = useRef(null)

  const { t } = useTranslation()

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        tileRef.current &&
        !tileRef.current.contains(event.target)
      ) {
        setExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  async function handleStart(event) {
    event.stopPropagation()

    try {
      setLoading(true)

      // await startService(service.name)

      await onRefresh()
    } finally {
      setLoading(false)
    }
  }

  async function handleStop(event) {
    event.stopPropagation()

    try {
      setLoading(true)

      // await stopService(service.name)

      await onRefresh()
    } finally {
      setLoading(false)
    }
  }

  async function handleRestart(event) {
    event.stopPropagation()

    try {
      setLoading(true)

      // await restartService(service.name)

      await onRefresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      ref={tileRef}
      className={`panel service-tile ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="service-tile-header">
        <span>{service.displayName}</span>

        <strong className={service.isRunning ? 'running' : 'warning'}>
          {service.isRunning
            ? t('service.running')
            : t('service.not-running')}
        </strong>
      </div>

      {expanded && (
        <div className="service-actions">
          <button
            onClick={handleStart}
            disabled={loading || service.isRunning}
          >
            Start
          </button>

          <button
            onClick={handleStop}
            disabled={loading || !service.isRunning}
          >
            Stop
          </button>

          <button
            onClick={handleRestart}
            disabled={loading || !service.isRunning}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  )
}

export default ServiceStatusTile