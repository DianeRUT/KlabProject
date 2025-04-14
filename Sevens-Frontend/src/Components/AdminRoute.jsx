import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

// Protected route component for admin users
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="loading-container">Loading...</div>
  }

  if (!isAuthenticated) {
    // Redirect to login page with return path
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (!isAdmin) {
    // Redirect non-admin users to home page
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
