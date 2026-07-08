import { apiRequest } from './apiClient'

export function getHdSentinelDisks() {
  return apiRequest('/api/hdsentinel/disks')
}