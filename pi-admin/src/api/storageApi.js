import { apiRequest } from './apiClient'

export function getStorageDrives() {
  return apiRequest('/api/system/storage')
}