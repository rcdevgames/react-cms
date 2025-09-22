import { useCallback } from 'react'
import { login as loginAction, logout as logoutAction, isAuthenticated as checkAuth, getTokens, userEntity } from '@/state/authState'
import { authLoadingEntity } from '@/state/authState'

export function useAuth() {
  const tokens = getTokens()
  const isLoading = authLoadingEntity.use()
  const users = userEntity.use()

  const login = useCallback((userData, token, refresh_token) => {
    loginAction(userData, token, refresh_token)
  }, [])

  const logout = useCallback(() => {
    logoutAction()
  }, [])

  const isAuthenticated = useCallback(() => {
    return checkAuth()
  }, [])

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    login,
    logout,
    isAuthenticated,
    isLoading,
    users
  }
}