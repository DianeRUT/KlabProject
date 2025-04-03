import api from "./axios"

// Get all products with optional filters
export const getProducts = async (filters = {}) => {
  try {
    const response = await api.get("/products", { params: filters })
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    throw error
  }
}

// Get top rated products
export const getTopProducts = async () => {
  try {
    const response = await api.get("/products/top")
    return response.data
  } catch (error) {
    console.error("Error fetching top products:", error)
    throw error
  }
}

// Get new arrival products
export const getNewProducts = async () => {
  try {
    const response = await api.get("/products/new")
    return response.data
  } catch (error) {
    console.error("Error fetching new products:", error)
    throw error
  }
}

// Create a product review
export const createProductReview = async (productId, review) => {
  try {
    const response = await api.post(`/products/${productId}/reviews`, review)
    return response.data
  } catch (error) {
    console.error("Error creating review:", error)
    throw error
  }
}

