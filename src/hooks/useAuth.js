import { useState, useEffect, useCallback } from 'react'
import { jwtDecode } from 'jwt-decode'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  const setSession = useCallback((token) => {
    if (token) {
      sessionStorage.setItem('accessToken', token)
      const decoded = jwtDecode(token)
      setUser(decoded)
      setAccessToken(token)
    } else {
      sessionStorage.removeItem('accessToken')
      setUser(null)
      setAccessToken(null)
    }
  }, [])

  useEffect(() => {
    const storedAccessToken = sessionStorage.getItem('accessToken')
    if (storedAccessToken) {
      try {
        const decoded = jwtDecode(storedAccessToken)
        const currentTime = Date.now() / 1000
        if (decoded.exp > currentTime) {
          setSession(storedAccessToken)
        } else {
          setSession(null)
        }
      } catch (error) {
        console.error('Invalid token:', error)
        setSession(null)
      }
    }
  }, [setSession])

  const login = useCallback((token) => {
    setSession(token)
  }, [setSession])

  const logout = useCallback(() => {
    setSession(null)
    // You may want to call an API endpoint to invalidate the refresh token
  }, [setSession])

  const isAuthenticated = useCallback(() => {
    return !!accessToken
  }, [accessToken])

  return { user, accessToken, login, logout, isAuthenticated }
}