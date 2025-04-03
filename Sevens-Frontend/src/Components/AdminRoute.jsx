"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "./ProtectedRoute"

// Protected route component for admin users
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) {
    // You can show a loading spinner here
    return <div>Loading...</div>
  }

  if (!isAuthenticated || !isAdmin) {
    // Redirect unauthorized users to home page
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute

