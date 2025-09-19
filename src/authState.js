import { entity } from 'simpler-state'

export const userEntity = entity(null)

export const login = (userData) => {
  userEntity.set(userData)
}

export const logout = () => {
  userEntity.set(null)
}

export const isAuthenticated = () => userEntity.get() !== null