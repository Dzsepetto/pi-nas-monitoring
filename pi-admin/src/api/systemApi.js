import { apiRequest } from './apiClient'

export function getServicesStatus() {
  return apiRequest('/api/system/services/status')
}