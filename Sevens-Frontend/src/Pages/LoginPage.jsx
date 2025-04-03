"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../Context/AuthContext" 
import "../styles/LoginPage.css"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get redirect path from location state or default to home page
  const redirect = location.state?.from || "/"

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await login(email, password)
      navigate(redirect)
    } catch (err) {
      // Error is handled in AuthContext
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

