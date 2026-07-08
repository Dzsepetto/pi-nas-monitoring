import { apiRequest } from './apiClient'

export function getDashboardStorage() {
  return apiRequest('/api/dashboard/storage')
}