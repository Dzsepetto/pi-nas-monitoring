import Topbar from '../components/elements/TopBar/Topbar'
import StorageDetailWidget from '../components/widgets/storage/Detail/StorageDetailWidget'

function StorageDetailPage() {
  return (
    <>
      <Topbar
        title="Háttértár részletei"
        subtitle="Részletes meghajtó állapot és tárhelyinformációk"
      />

      <StorageDetailWidget />
    </>
  )
}

export default StorageDetailPage