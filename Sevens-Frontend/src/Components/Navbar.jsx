"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../Context/AuthContext" 
import SearchBar from "./SearchBar"
import "../styles/Navbar.css"

const Navbar = () => {
  const { totalItems } = useCart()
  const { currentUser, logout } = useAuth()
  const [searchExpanded, setSearchExpanded] = useState(false)

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ShopNow
        </Link>

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
         

          {currentUser ? (
            <div className="user-dropdown">
              <button className="navbar-action user">
                <i className="fas fa-user"></i>
                <span className="user-name">{currentUser.name.split(" ")[0]}</span>
              </button>
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  <i className="fas fa-user-circle"></i>
                  <span>My Profile</span>
                </Link>
                {currentUser.role === "admin" && (
                  <Link to="/admin" className="dropdown-item">
                    <i className="fas fa-user-shield"></i>
                    <span>Admin Panel</span>
                  </Link>
                )}
                <button onClick={logout} className="dropdown-item logout">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
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

