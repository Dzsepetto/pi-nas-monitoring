import { useEffect, useState } from 'react'
import AppLayout from '../layout/AppLayout'
import Topbar from '../components/TopBar/Topbar'
import StorageCard from '../components/StorageCard/StorageCard'
import { getStorageDrives } from '../api/storageApi'
import './style/storagePage.css'

function StoragePage({ token }) {
  const [drives, setDrives] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadStorage() {
    try {
      setLoading(true)
      setError(null)

      const data = await getStorageDrives(token)
      setDrives(data.storages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStorage()
  }, [])

  return (
    <>
      <Topbar
        title="Háttértárak"
        subtitle="Csatlakoztatott meghajtók és mount állapot"
      >
        <button onClick={loadStorage} disabled={loading}>
          {loading ? 'Frissítés...' : 'Frissítés'}
        </button>
      </Topbar>

      {error && (
        <section className="panel error">
          {error}
        </section>
      )}

      <section className="storage-grid">
        {drives.map((drive) => (
          <StorageCard key={drive.device || drive.name} drive={drive} />
        ))}
      </section>
    </>
  )
}

export default StoragePage