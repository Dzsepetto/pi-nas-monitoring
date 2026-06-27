import { apiRequest } from './apiClient'

export function loginRequest(username) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username })
  })
}