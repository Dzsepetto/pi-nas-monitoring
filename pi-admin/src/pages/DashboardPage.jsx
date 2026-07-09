import Topbar from '../components/elements/TopBar/Topbar'
import ServiceStatusWidget from '../components/widgets/service/Status/ServiceStatusWidget'
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
        <ServiceStatusWidget />
        <DashboardStorageWidget />
      </section>
    </>
  )
}

export default DashboardPage