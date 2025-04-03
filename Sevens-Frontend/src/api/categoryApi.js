import api from "./axios"

// Get all categories
export const getCategories = async () => {
  try {
    const response = await api.get("/categories")
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
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

