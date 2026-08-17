import { useTranslation } from 'react-i18next'
import Topbar from '../components/elements/TopBar/Topbar'
import ServiceStatusListWidget from '../components/widgets/service/Status/ServiceStatusListWidget'
import ServiceStatusTileWidget from '../components/widgets/service/Tile/ServiceStatusTileWidget'

function ServicesPage() {
  const {t} = useTranslation()
  return (
    <>
      <Topbar
        title={t('service.title')}
        subtitle={t('service.sub-title')}
      />

      <ServiceStatusListWidget />
      <ServiceStatusTileWidget />
    </>
  )
}

export default ServicesPage