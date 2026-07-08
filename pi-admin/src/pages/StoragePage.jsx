import Topbar from '../components/elements/TopBar/Topbar'
import StorageOverviewWidget from '../components/widgets/storage/Overview/StorageOverviewWidget'

function StoragePage() {
  return (
    <>
      <Topbar
        title="Háttértárak"
        subtitle="Meghajtók, tárhelyhasználat és állapot"
      />

      <StorageOverviewWidget />
    </>
  )
}

export default StoragePage