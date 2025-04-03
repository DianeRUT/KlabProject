import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth, AuthProvider } from "./Context/AuthContext";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/Home";
import { CartProvider } from "./context/CartContext";

import ProductsPage from "./Pages/ProductsPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import PaymentPage from "./Pages/PaymentPage";
import ConfirmationPage from "./Pages/ConfirmationPage";
import CategoriesPage from "./pages/CategoriesPage";
import ContactPage from "./Pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
import AdminPage from "./Pages/AdminPage";
import UnauthorizedPage from "./Pages/UnauthorizedPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import ProtectedRoute from "./Components/ProtectedRoute";

// Wrapper component to handle protected routes
const AppRoutes = () => {
  const { currentUser, isAdmin } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="search" element={<SearchResultsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="register" element={currentUser ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />

        {/* Protected routes */}
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="confirmation"
          element={
            <ProtectedRoute>
              <ConfirmationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App


