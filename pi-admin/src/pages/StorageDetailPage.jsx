import { useTranslation } from 'react-i18next'
import Topbar from '../components/elements/TopBar/Topbar'
import StorageDetailWidget from '../components/widgets/storage/Detail/StorageDetailWidget'

function StorageDetailPage() {
  const {t} = useTranslation()
  return (
    <>
      <Topbar
        title={t('storageDetail.title')}
        subtitle={t('storageDetail.sub-title')}
      />

      <StorageDetailWidget />
    </>
  )
}

export default StorageDetailPage