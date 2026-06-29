import Topbar from '../components/elements/TopBar/Topbar'
import StorageStatusWidget from '../components/widgets/storage/Status/StorageStatusWidget'
import StorageSpaceWidget from '../components/widgets/storage/Space/StorageSpaceWidget'

function StoragePage() {
  return (
    <>
      <Topbar
        title="Háttértárak"
        subtitle="Csatlakoztatott meghajtók és mount állapot"
      />

      <StorageStatusWidget />
      <StorageSpaceWidget />
    </>
  )
}

export default StoragePage