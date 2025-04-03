import { createContext, useState, useContext, useEffect } from "react"
import {
  getCart,
  addToCart as addToCartApi,
  updateCartItem,
  removeFromCart as removeFromCartApi,
  clearCart as clearCartApi,
} from "../api/cartApi"
import { useAuth } from "../components/ProtectedRoute"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isAuthenticated } = useAuth()

  // Calculate cart totals
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  // Fetch cart from backend when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchCart = async () => {
        setLoading(true)
        try {
          const cartData = await getCart()
          setCartItems(cartData.items || [])
        } catch (err) {
          console.error("Error fetching cart:", err)
          setError("Failed to load cart")
        } finally {
          setLoading(false)
        }
      }

      fetchCart()
    } else {
      // If not authenticated, load cart from localStorage
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    }
  }, [isAuthenticated])

  // Save cart to localStorage when it changes (for non-authenticated users)
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, isAuthenticated])

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex((item) => item.product === product._id || item._id === product._id)

    if (isAuthenticated) {
      try {
        setLoading(true)
        const productId = product._id
        const updatedCart = await addToCartApi(productId, quantity)
        setCartItems(updatedCart.items || [])
      } catch (err) {
        console.error("Error adding to cart:", err)
        setError("Failed to add item to cart")
      } finally {
        setLoading(false)
      }
    } else {
      // Handle local cart for non-authenticated users
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...cartItems]
        updatedItems[existingItemIndex].quantity += quantity
        setCartItems(updatedItems)
      } else {
        // Item doesn't exist, add new item
        setCartItems([
          ...cartItems,
          {
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            quantity,
          },
        ])
      }
    }
  }

  // Update cart item quantity
  const updateQuantity = async (productId, quantity) => {
    if (isAuthenticated) {
      try {
        setLoading(true)
        const updatedCart = await updateCartItem(productId, quantity)
        setCartItems(updatedCart.items || [])
      } catch (err) {
        console.error("Error updating cart:", err)
        setError("Failed to update cart")
      } finally {
        setLoading(false)
      }
    } else {
      // Handle local cart for non-authenticated users
      const updatedItems = cartItems.map((item) =>
        item.product === productId || item._id === productId ? { ...item, quantity } : item,
      )
      setCartItems(updatedItems)
    }
  }

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      try {
        setLoading(true)
        const updatedCart = await removeFromCartApi(productId)
        setCartItems(updatedCart.items || [])
      } catch (err) {
        console.error("Error removing from cart:", err)
        setError("Failed to remove item from cart")
      } finally {
        setLoading(false)
      }
    } else {
      // Handle local cart for non-authenticated users
      const updatedItems = cartItems.filter((item) => item.product !== productId && item._id !== productId)
      setCartItems(updatedItems)
    }
  }

  // Clear cart
  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        setLoading(true)
        await clearCartApi()
        setCartItems([])
      } catch (err) {
        console.error("Error clearing cart:", err)
        setError("Failed to clear cart")
      } finally {
        setLoading(false)
      }
    } else {
      // Handle local cart for non-authenticated users
      setCartItems([])
      localStorage.removeItem("cart")
    }
  }

  // Sync local cart with backend when user logs in
  const syncCartWithBackend = async (localCart) => {
    try {
      setLoading(true)
      // For each item in local cart, add to backend cart
      for (const item of localCart) {
        await addToCartApi(item._id, item.quantity)
      }
      // Get updated cart from backend
      const updatedCart = await getCart()
      setCartItems(updatedCart.items || [])
      // Clear local storage cart
      localStorage.removeItem("cart")
    } catch (err) {
      console.error("Error syncing cart:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        totalItems,
        subtotal,
        shipping,
        tax,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        syncCartWithBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

