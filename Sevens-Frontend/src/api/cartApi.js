import api from "./axios"

// Get user cart
export const getCart = async () => {
  try {
    const response = await api.get("/cart")
    return response.data
  } catch (error) {
    console.error("Error fetching cart:", error)
    throw error
  }
}

// Add item to cart
export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post("/cart", { productId, quantity })
    return response.data
  } catch (error) {
    console.error("Error adding to cart:", error)
    throw error
  }
}

// Update cart item quantity
export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await api.put("/cart", { productId, quantity })
    return response.data
  } catch (error) {
    console.error("Error updating cart item:", error)
    throw error
  }
}

// Remove item from cart
export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete(`/cart/${productId}`)
    return response.data
  } catch (error) {
    console.error("Error removing from cart:", error)
    throw error
  }
}

// Clear cart
export const clearCart = async () => {
  try {
    const response = await api.delete("/cart")
    return response.data
  } catch (error) {
    console.error("Error clearing cart:", error)
    throw error
  }
}

