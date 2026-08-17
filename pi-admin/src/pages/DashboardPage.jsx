import Topbar from '../components/elements/TopBar/Topbar'
import ServiceStatusListWidget from '../components/widgets/service/Status/ServiceStatusListWidget'
import DashboardStorageWidget from '../components/widgets/dashboard/storage/DashboardStorageWidget'
import './style/dashboardStyle.css'

function DashboardPage() {
  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="Raspberry Pi NAS áttekintés"
      />

      <section className="dashboard-grid">
        <ServiceStatusListWidget />
        <DashboardStorageWidget />
      </section>
    </>
  )
}

export default DashboardPage