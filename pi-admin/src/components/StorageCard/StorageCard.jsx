import "./StorageCard.css"

function StorageCard({ drive }) {
  const isMounted = drive.isMounted

  return (
    <article className="storage-card">
      <div className="storage-card-header">
        <div>
          <h3>{drive.displayName}</h3>
        </div>

        <span className={isMounted ? 'badge active' : 'badge inactive'}>
          {isMounted ? 'Active' : 'Not active'}
        </span>
      </div>

      <div className="storage-info">
        <div>
          <span>Méret</span>
          <strong>{drive.size || '-'}</strong>
        </div>

        <div>
          <span>Típus</span>
          <strong>{drive.type || '-'}</strong>
        </div>

        <div>
          <span>Fájlrendszer</span>
          <strong>{drive.fileSystem || '-'}</strong>
        </div>

        <div>
          <span>Mount pont</span>
          <strong>{drive.mountPoint || 'Nincs mountolva'}</strong>
        </div>
      </div>
    </article>
  )
}

export default StorageCard