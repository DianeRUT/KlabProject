"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getSearchSuggestions } from "../api/searchApi"
import "../styles/SearchBar.css"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef(null)

  // Fetch suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([])
        return
      }

      setLoading(true)
      try {
        const data = await getSearchSuggestions(query)
        setSuggestions(data)
      } catch (error) {
        console.error("Error fetching suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    // Debounce the suggestions fetch
    const timeoutId = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    navigate(`/products/${suggestion._id}`)
    setShowSuggestions(false)
    setQuery("")
  }

  return (
    <div className="search-bar-container" ref={searchRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search products..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </form>

      {showSuggestions && query.length >= 2 && (
        <div className="search-suggestions">
          {loading ? (
            <div className="suggestion-loading">Loading...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div key={suggestion._id} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                <div className="suggestion-image">
                  <img src={suggestion.image || "/placeholder.svg"} alt={suggestion.name} />
                </div>
                <div className="suggestion-details">
                  <div className="suggestion-name">{suggestion.name}</div>
                  <div className="suggestion-price">${suggestion.price.toFixed(2)}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-suggestions">No products found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar

