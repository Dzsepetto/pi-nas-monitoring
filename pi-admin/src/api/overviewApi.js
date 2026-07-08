import { apiRequest } from './apiClient'

export function getStorageOverview() {
  return apiRequest('/api/storage')
}
export function getStorageByUuid(uuid) {
  return apiRequest(`/api/storage/${uuid}`)
}
