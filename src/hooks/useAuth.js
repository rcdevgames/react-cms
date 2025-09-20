import { useState, useEffect, useCallback } from 'react'

export function useAuth() {
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)

  const setSession = useCallback((token, refresh_token) => {
    if (token && refresh_token) {
      sessionStorage.setItem('accessToken', token)
      sessionStorage.setItem('refreshToken', refresh_token)
      setAccessToken(token)
      setRefreshToken(refresh_token)
    } else {
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('refreshToken')
      setAccessToken(null)
      setRefreshToken(null)
    }
  }, [])

  useEffect(() => {
    const storedAccessToken = sessionStorage.getItem('accessToken')
    const storedRefreshToken = sessionStorage.getItem('refreshToken')
    if (storedAccessToken && storedRefreshToken) {
      try {
        setSession(storedAccessToken, storedRefreshToken)
      } catch (error) {
        setSession(null, null)
      }
    }
  }, [setSession])

  const login = useCallback((token, refresh_token) => {
    setSession(token, refresh_token)
  }, [setSession])

  const logout = useCallback(() => {
    setSession(null, null)
    // You may want to call an API endpoint to invalidate the refresh token
  }, [setSession])

  const isAuthenticated = useCallback(() => {
    return !!accessToken && !!refreshToken
  }, [accessToken, refreshToken])

  return { accessToken, refreshToken, login, logout, isAuthenticated }
}