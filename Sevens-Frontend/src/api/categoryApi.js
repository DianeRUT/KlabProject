import api from "./axios"

// Get all categories
export const getCategories = async () => {
  try {
    console.log("Fetching categories...")
    const response = await api.get("/categories")
    console.log("Categories response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    console.error("Error details:", error.response?.data || error.message)
    // Return empty array instead of throwing to prevent cascading failures
    return []
  }
}

// Get a single category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error)
    throw error
  }
}

// Add the missing category management functions after the existing functions

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await api.post("/categories", categoryData)
    return response.data
  } catch (error) {
    console.error("Error creating category:", error)
    throw error
  }
}

// Update a category
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/categories/${id}`, categoryData)
    return response.data
  } catch (error) {
    console.error(`Error updating category ${id}:`, error)
    throw error
  }
}

// Delete a category
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting category ${id}:`, error)
    throw error
  }
}

