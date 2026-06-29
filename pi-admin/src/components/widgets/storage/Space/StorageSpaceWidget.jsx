import { useEffect, useState } from 'react'
import { getStorageSpaceOnDrives } from '../../../../api/storageApi'
import StorageSpaceCard from '../../../Elements/StorageSpaceCard/StorageSpaceCard'
import "./StorageSpaceWidget.css"

function StorageSpaceWidget() {
  const [spaces, setSpaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadSpaces() {
    try {
      setLoading(true)
      setError(null)

      const data = await getStorageSpaceOnDrives()
      setSpaces(data.spaces)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSpaces()
  }, [])

  if (error) {
    return <section className="panel error">{error}</section>
  }

  return (
    <section>
      <div className="widget-header">
        <h2>Tárhely kihasználtság</h2>

        <button onClick={loadSpaces} disabled={loading}>
          {loading ? 'Frissítés...' : 'Frissítés'}
        </button>
      </div>

      <div className="storage-space-grid">
        {spaces.map((space) => (
          <StorageSpaceCard key={space.uuid} storage={space} />
        ))}
      </div>
    </section>
  )
}

export default StorageSpaceWidget