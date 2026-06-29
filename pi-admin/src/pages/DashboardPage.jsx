import Topbar from '../components/elements/TopBar/Topbar'
import ServiceStatusWidget from '../components/widgets/service/Status/ServiceStatusWidget'
import StorageStatusWidget from '../components/widgets/storage/Status/StorageStatusWidget'
import StorageSpaceWidget from '../components/widgets/storage/Space/StorageSpaceWidget'
import './style/dashboardStyle.css'

function DashboardPage() {
  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="Raspberry Pi NAS áttekintés"
      />

      <section className="dashboard-grid">
        <ServiceStatusWidget />
        <StorageStatusWidget />
        <StorageSpaceWidget />
      </section>
    </>
  )
}

export default DashboardPage