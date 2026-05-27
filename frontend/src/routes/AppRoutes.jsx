import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Plans from "../pages/Plans"
import Suscription from "../pages/Suscription"
import Developers from "../pages/Developers"
import PQR from "../pages/PQR"
import Privacy from "../pages/Privacy"

function AppRoutes() {
  return (
    <BrowserRouter>   {/* ← SIN basename */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/suscription" element={<Suscription />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/pqr" element={<PQR />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes