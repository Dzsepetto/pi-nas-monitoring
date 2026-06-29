import { apiRequest } from './apiClient'

export function getStorageDrives() {
  return apiRequest('/api/system/storage')
}

export function getStorageSpaceOnDrives() {
  return apiRequest('/api/system/storage/space')
}