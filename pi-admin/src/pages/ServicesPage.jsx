import Topbar from '../components/elements/TopBar/Topbar'
import ServiceStatusWidget from '../components/widgets/service/Status/ServiceStatusWidget'

function ServicesPage() {
  return (
    <>
      <Topbar
        title="Szolgáltatások"
        subtitle="Tailscale, Samba és hd-idle állapot"
      />

      <ServiceStatusWidget />
    </>
  )
}

export default ServicesPage