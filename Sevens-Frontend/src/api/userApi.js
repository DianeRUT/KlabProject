import api from "./axios"

// Login user
export const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password })

    // Save token and user info to localStorage
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("userInfo", JSON.stringify(response.data))

    return response.data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

// Register user
export const register = async (name, email, password) => {
  try {
    const response = await api.post("/users", { name, email, password })

    // Save token and user info to localStorage
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("userInfo", JSON.stringify(response.data))

    return response.data
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

// Logout user
export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("userInfo")
}

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/profile")
    return response.data
  } catch (error) {
    console.error("Error fetching user profile:", error)
    throw error
  }
}

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put("/users/profile", userData)

    // Update localStorage with new user info
    localStorage.setItem("userInfo", JSON.stringify(response.data))

    return response.data
  } catch (error) {
    console.error("Error updating profile:", error)
    throw error
  }
}

