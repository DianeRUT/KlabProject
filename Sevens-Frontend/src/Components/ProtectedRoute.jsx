"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../Context/AuthContext" 

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, isAdmin } = useAuth()
  const location = useLocation()

  if (!currentUser) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If route requires admin access and user is not admin
  if (adminOnly && !isAdmin()) {
    // Redirect to unauthorized page or home
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedRoute

