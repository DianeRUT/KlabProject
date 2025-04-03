"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // For demo purposes, we'll use localStorage to simulate a backend
  // In a real app, you would use a proper backend API
  const login = (email, password) => {
    setError("")

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Find user with matching email and password
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      // Remove password before storing in state/localStorage
      const { password, ...userWithoutPassword } = user

      setCurrentUser(userWithoutPassword)
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

      // If user has a saved cart, merge it with the current cart
      // This would be handled differently in a real app with a backend
      return true
    } else {
      setError("Invalid email or password")
      return false
    }
  }

  const register = (name, email, password) => {
    setError("")

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if email already exists
    if (users.some((user) => user.email === email)) {
      setError("Email already in use")
      return false
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: "user", // Default role
      createdAt: new Date().toISOString(),
    }

    // Add to users array
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Log in the new user
    const { password: _, ...userWithoutPassword } = newUser
    setCurrentUser(userWithoutPassword)
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

    return true
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
    // In a real app, you might want to clear sensitive data or tokens
  }

  const isAdmin = () => {
    return currentUser?.role === "admin"
  }

  // Initialize some demo users if none exist
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    if (users.length === 0) {
      const demoUsers = [
        {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          password: "admin123",
          role: "admin",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Regular User",
          email: "user@example.com",
          password: "user123",
          role: "user",
          createdAt: new Date().toISOString(),
        },
      ]

      localStorage.setItem("users", JSON.stringify(demoUsers))
    }
  }, [])

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    error,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

