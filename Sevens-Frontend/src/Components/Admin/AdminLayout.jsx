"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import "../../styles/admin/AdminLayout.css"

const AdminLayout = ({ children }) => {
  const { isAuthenticated, isAdmin, userInfo } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } })
    } else if (!isAdmin) {
      navigate("/")
    }
  }, [isAuthenticated, isAdmin, navigate, location])

  // If not authenticated or not admin, don't render the layout
  if (!isAuthenticated || !isAdmin) {
    return null
  }

  // Update the mobile menu toggle functionality
  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible)
  }

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${mobileMenuVisible ? "mobile-visible" : ""}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>

        <div className="admin-profile">
          <div className="admin-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="admin-info">
            <p className="admin-name">{userInfo?.name}</p>
            <p className="admin-role">Administrator</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/admin/dashboard" className={location.pathname === "/admin/dashboard" ? "active" : ""}>
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className={location.pathname.includes("/admin/products") ? "active" : ""}>
                <i className="fas fa-box"></i>
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/categories" className={location.pathname.includes("/admin/categories") ? "active" : ""}>
                <i className="fas fa-tags"></i>
                <span>Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className={location.pathname.includes("/admin/orders") ? "active" : ""}>
                <i className="fas fa-shopping-bag"></i>
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className={location.pathname.includes("/admin/users") ? "active" : ""}>
                <i className="fas fa-users"></i>
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" className={location.pathname.includes("/admin/settings") ? "active" : ""}>
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="view-store-btn">
            <i className="fas fa-store"></i>
            <span>View Store</span>
          </Link>
          <button className="logout-btn" onClick={() => navigate("/")}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="admin-content">
        {/* Update the header section to include the mobile menu toggle */}
        <header className="admin-header">
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </div>

          <div className="header-search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search..." />
          </div>

          <div className="header-actions">
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </button>

            <button className="help-btn">
              <i className="fas fa-question-circle"></i>
            </button>
          </div>
        </header>

        <div className="admin-main-content">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout

