import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../providers/auth.provider'

export function RequireAuth() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />
}

export function RedirectIfAuth() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />
}
