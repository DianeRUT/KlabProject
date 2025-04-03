"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/SearchBar.css"

const SearchBar = ({ isExpanded, toggleSearch }) => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      toggleSearch() // Close search bar on mobile
    }
  }

  return (
    <div className={`search-bar ${isExpanded ? "expanded" : ""}`}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus={isExpanded}
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  )
}

export default SearchBar

