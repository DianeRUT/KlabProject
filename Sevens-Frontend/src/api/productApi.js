import api from "./axios"

// Get all products with optional filters
export const getProducts = async (filters = {}) => {
  try {
    console.log("Fetching products with filters:", filters)
    const response = await api.get("/products", { params: filters })
    console.log("Products API response:", response.data)

    // Return the raw response data - let the component handle the structure
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error)
    console.error("Error details:", error.response?.data || error.message)
    throw error
  }
}

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    console.log(`Fetching product with ID: ${id}`)
    const response = await api.get(`/products/${id}`)
    console.log("Product detail response:", response.data)
    return response.data
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    console.error("Error details:", error.response?.data || error.message)
    throw error
  }
}

// Get top rated products
export const getTopProducts = async () => {
  try {
    console.log("Fetching top products...")
    const response = await api.get("/products/top")
    console.log("Top products response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching top products:", error)
    // Return empty array to prevent cascading failures
    return []
  }
}

// Get new arrival products
export const getNewProducts = async () => {
  try {
    console.log("Fetching new products...")
    const response = await api.get("/products/new")
    console.log("New products response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching new products:", error)
    // Return empty array to prevent cascading failures
    return []
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

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData)
    return response.data
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}

// Update a product
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData)
    return response.data
  } catch (error) {
    console.error(`Error updating product ${id}:`, error)
    throw error
  }
}

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error)
    throw error
  }
}

