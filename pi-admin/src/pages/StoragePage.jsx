import { useTranslation } from 'react-i18next'
import Topbar from '../components/elements/TopBar/Topbar'
import StorageOverviewWidget from '../components/widgets/storage/Overview/StorageOverviewWidget'

function StoragePage() {
  const {t} = useTranslation()
  return (
    <>
      <Topbar
        title={t('storage.title')}
        subtitle={t('storage.sub-title')}
      />

      <StorageOverviewWidget />
    </>
  )
}

export default StoragePage