import './ServiceStatusList.css'
function ServiceStatusList({ services }) {
  return (
    <section className="panel">
      <h2>Service státuszok</h2>

      {services.map((service) => (
        <div className="service" key={service.name}>
          <span>{service.displayName}</span>

          <strong className={service.isRunning ? 'running' : 'warning'}>
            {service.isRunning ? 'Fut' : 'Nem fut'}
          </strong>
        </div>
      ))}
    </section>
  )
}

export default ServiceStatusList