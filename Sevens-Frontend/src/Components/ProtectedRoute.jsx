"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

// Custom hook to check if user is authenticated
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem("userInfo")

    if (userInfo) {
      const user = JSON.parse(userInfo)
      setIsAuthenticated(true)
      setIsAdmin(user.isAdmin || false)
    } else {
      setIsAuthenticated(false)
      setIsAdmin(false)
    }

    setLoading(false)
  }, [])

  return { isAuthenticated, isAdmin, loading }
}

// Protected route component for authenticated users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    // You can show a loading spinner here
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    // Redirect to login page and save the location they tried to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}

export default ProtectedRoute

