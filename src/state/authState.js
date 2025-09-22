import { entity } from 'simpler-state'

export const tokenEntity = entity({
  accessToken: null,
  refreshToken: null
})

export const userEntity = entity(null)
export const authLoadingEntity = entity(true) // Start with true since we'll check on init

export const setSession = (token, refresh_token) => {
  if (token && refresh_token) {
    sessionStorage.setItem('accessToken', token)
    sessionStorage.setItem('refreshToken', refresh_token)
    tokenEntity.set({
      accessToken: token,
      refreshToken: refresh_token
    })
  } else {
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    tokenEntity.set({
      accessToken: null,
      refreshToken: null
    })
  }
}

export const login = (userData, token, refresh_token) => {
  userEntity.set(userData)
  setSession(token, refresh_token)
}

export const logout = () => {
  userEntity.set(null)
  setSession(null, null)
}

export const getTokens = () => tokenEntity.get()

export const isAuthenticated = () => {
  const currentAccessToken = sessionStorage.getItem('accessToken')
  const currentRefreshToken = sessionStorage.getItem('refreshToken')
  return !!currentAccessToken && !!currentRefreshToken && userEntity.get() !== null
}

// Initialize auth state from session storage
const initializeAuth = async () => {
  authLoadingEntity.set(true)
  try {
    const storedAccessToken = sessionStorage.getItem('accessToken')
    const storedRefreshToken = sessionStorage.getItem('refreshToken')
    
    if (storedAccessToken && storedRefreshToken) {
      // Set tokens first
      setSession(storedAccessToken, storedRefreshToken)
      
      // Import auth service and get user data
      const { authService } = await import('@/services')
      const userResponse = await authService.getMe()
      userEntity.set(userResponse.data)
    } else {
      // If no tokens found, just logout
      logout()
    }
  } catch (error) {
    console.error('Failed to initialize auth:', error)
    logout()
  } finally {
    authLoadingEntity.set(false)
  }
}

// Run initialization
initializeAuth()