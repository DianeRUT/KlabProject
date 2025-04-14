import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { login } from "../api/userApi"
import "../styles/LoginPage.css"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  // Get redirect path from location state or default to home page
  const redirect = location.state?.from || "/"

  // Check if already logged in
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      console.log("Submitting login form with:", { email })
      const userData = await login(email, password)
      console.log("Login successful:", userData)

      // Verify token was saved
      const token = localStorage.getItem("token")
      console.log("Token saved:", token ? "Yes" : "No")

      navigate(redirect)
    } catch (err) {
      console.error("Login failed:", err)
      setError(err.response?.data?.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Sign In</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="register-link">
          New customer? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
