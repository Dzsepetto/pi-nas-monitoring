import { useTranslation } from 'react-i18next'
import Topbar from '../components/elements/TopBar/Topbar'
import ServiceStatusWidget from '../components/widgets/service/Status/ServiceStatusWidget'

function ServicesPage() {
  const {t} = useTranslation()
  return (
    <>
      <Topbar
        title={t('service.title')}
        subtitle={t('service.sub-title')}
      />

      <ServiceStatusWidget />
    </>
  )
}

export default ServicesPage