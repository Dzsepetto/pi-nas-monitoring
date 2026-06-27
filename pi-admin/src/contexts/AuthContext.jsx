import { createContext, useEffect, useState } from 'react'
import { getToken, removeToken, saveToken } from '../utils/authStorage'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken())
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken())

  function login(token) {
    saveToken(token)
    setToken(token)
    setIsAuthenticated(true)
  }

  function logout() {
    removeToken()
    setToken(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    setIsAuthenticated(!!token)
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}