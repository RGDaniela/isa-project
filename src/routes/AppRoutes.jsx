import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Products from "../pages/Products"
import Cart from "../pages/Cart"
import Developers from "../pages/Developers"
import PQR from "../pages/PQR"
import Privacy from "../pages/Privacy"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/pqr" element={<PQR />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes