import { getToken } from '../utils/authStorage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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

  const text = await response.text()

  let result = null

  if (text) {
    result = JSON.parse(text)
  }

  if (!response.ok) {
    console.log(result?.error?.message)

    throw new Error(
      result?.error?.message || 'API hiba történt.'
    )
  }

  if (!result) {
    return null
  }

  if (result.success === false) {
    console.log(result.error?.message)

    throw new Error(
      result.error?.message || 'API hiba történt.'
    )
  }

  return result.data
}