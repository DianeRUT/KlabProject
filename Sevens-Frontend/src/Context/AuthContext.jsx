
import { createContext, useState, useContext } from "react"
import { login as loginApi, register as registerApi, logout as logoutApi } from "../api/userApi"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = localStorage.getItem("userInfo")
    return savedUserInfo ? JSON.parse(savedUserInfo) : null
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Check if user is authenticated
  const isAuthenticated = !!userInfo

  // Check if user is admin
  const isAdmin = userInfo?.isAdmin || false

  // Login function
  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const data = await loginApi(email, password)
      setUserInfo(data)
      return data
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Register function
  const register = async (name, email, password) => {
    setLoading(true)
    setError(null)
    try {
      const data = await registerApi(name, email, password)
      setUserInfo(data)
      return data
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    logoutApi()
    setUserInfo(null)
  }

  // Value object to be provided to consumers
  const value = {
    userInfo,
    isAuthenticated,
    isAdmin,
    loading,
    error,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

