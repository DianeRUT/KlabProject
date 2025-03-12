import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import ProductDetails from "./Pages/ProductDetails";
import CategoryPage from "./Pages/Category";
import CartPage from "./Pages/Cart";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product" element={<ProductDetails/>} />
          <Route path="category" element={<CategoryPage/>} />
          <Route path="cart" element={<CartPage/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
