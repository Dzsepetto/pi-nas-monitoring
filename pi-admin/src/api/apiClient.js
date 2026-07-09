import { getToken } from '../utils/authStorage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiRequest(path, options = {}) {
  const token = getToken()

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  })

  const result = await response.json()

  if (!response.ok || !result.success) {
    console.log(result.error?.message)
    throw new Error(result.error?.message || 'API hiba történt.')
  }

  return result.data
}