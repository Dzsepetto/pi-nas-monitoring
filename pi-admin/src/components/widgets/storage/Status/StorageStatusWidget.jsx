import { useEffect, useState } from 'react'
import { getStorageDrives } from '../../../../api/storageApi'
import StorageCard from '../../../Elements/StorageCard/StorageCard'
import "./StorageStatusWidget.css"

function StorageStatusWidget() {
  const [drives, setDrives] = useState([])
  const [error, setError] = useState(null)

  async function loadStorage() {
    try {
      setError(null)
      const data = await getStorageDrives()
      setDrives(data.storages)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    loadStorage()
  }, [])

  if (error) {
    return <section className="panel error">{error}</section>
  }

  return (
    <section className="storage-grid">
      {drives.map((drive) => (
        <StorageCard key={drive.uuid} drive={drive} />
      ))}
    </section>
  )
}

export default StorageStatusWidget