import axios from "axios"

// Create an axios instance with default config
const baseURL = import.meta.env.VITE_BASE_URL
const api = axios.create({
 
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to attach the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message || error)

    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      console.log("Authentication error - redirecting to login")
      localStorage.removeItem("token")
      localStorage.removeItem("userInfo")

      // Redirect to login page
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default api;
