import './ServiceStatusList.css'
import { useTranslation } from 'react-i18next'

function ServiceStatusList({ services}){
    const { t } = useTranslation()

    return(
    <section className="panel">
        {services.map((service) => (
            <div className="service" key={service.name}>
                <span>{service.displayName}</span>
                <strong className={service.isRunning ? 'running' : 'warning'}>
                    {service.isRunning ? t('service.running') : t('service.not-running')}
                </strong>
            </div>
        ))}
    </section>
    )
}

export default ServiceStatusList