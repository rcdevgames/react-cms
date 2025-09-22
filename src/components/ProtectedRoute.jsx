import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  // Get authentication status immediately
  const authenticated = isAuthenticated()

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute