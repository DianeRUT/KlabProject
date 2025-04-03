import api from "./axios"

// Search products with query and optional filters
export const searchProducts = async (query, filters = {}) => {
  try {
    const response = await api.get("/products/search", {
      params: {
        query,
        ...filters,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error searching products:", error)
    throw error
  }
}

// Get search suggestions as user types
export const getSearchSuggestions = async (query) => {
  try {
    const response = await api.get("/products/suggestions", {
      params: { query },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching search suggestions:", error)
    throw error
  }
}

