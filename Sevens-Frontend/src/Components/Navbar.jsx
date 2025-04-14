import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../Context/AuthContext" 
import SearchBar from "./SearchBar"
import logo from "../assets/Images/logo.jpeg"
import "../styles/Navbar.css"

const Navbar = () => {
  const { totalItems } = useCart()
  const { isAuthenticated, userInfo, logout } = useAuth()

  const [searchExpanded, setSearchExpanded] = useState(false)

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded)
  }

 
  return (
    <nav className="navbar">
      <div className="navbar-container">
          <div className="navbar-logo">
              <img src={logo} alt="Logo" />
            </div>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/products" className="navbar-link">
            Products
          </Link>
          <Link to="/categories" className="navbar-link">
            Categories
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
        </div>

        <div className="navbar-actions">
         
            <SearchBar isExpanded={searchExpanded} toggleSearch={toggleSearch} />
         

            {isAuthenticated ? (
            <div className="user-dropdown">
              <button className="user-btn">
                <i className="fas fa-user"></i>
                <span className="user-name">{userInfo.name.split(" ")[0]}</span>
                <i className="fas fa-chevron-down dropdown-arrow"></i>
              </button>
              <div className="dropdown-content">
                <div className="dropdown-header">
                  <p className="dropdown-user-name">{userInfo.name}</p>
                  <p className="dropdown-user-email">{userInfo.email}</p>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item">
                  <i className="fas fa-user-circle"></i> My Profile
                </Link>
                <Link to="/orders/myorders" className="dropdown-item">
                  <i className="fas fa-shopping-bag"></i> My Orders
                </Link>
                {userInfo.isAdmin && (
                  <Link to="/admin/dashboard" className="dropdown-item admin-link">
                    <i className="fas fa-tachometer-alt"></i> Admin Dashboard
                  </Link>
                )}
                <div className="dropdown-divider"></div>
                <button
                  onClick={() => {
                    logout()
                    window.location.href = "/"
                  }}
                  className="logout-btn"
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="navbar-action">
              <i className="fas fa-user"></i>
            </Link>
          )}

          <Link to="/cart" className="navbar-action cart">
            <i className="fas fa-shopping-cart"></i>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
