import { apiRequest } from './apiClient'

export function getServicesStatus() {
  return apiRequest('/api/system/services/status')
}

export function changeServiceStatus(serviceName, wantedStatus) {
  return apiRequest('/api/system/services/statuschange', {
    method: 'POST',
    body: JSON.stringify({
      serviceName,
      wantedStatus
    })
  })
}