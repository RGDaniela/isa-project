import { Link } from "react-router-dom"
import "../styles/navbar.css"
import { FaShoppingCart, FaUser, FaUniversalAccess } from "react-icons/fa"  // ← CAMBIADO
import { useState } from "react"

function Navbar() {
  const [fontSize, setFontSize] = useState(16)

  const increaseFont = () => {
    setFontSize(fontSize + 2)
    document.documentElement.style.fontSize = `${fontSize + 2}px`
  }

  const decreaseFont = () => {
    setFontSize(fontSize - 2)
    document.documentElement.style.fontSize = `${fontSize - 2}px`
  }

  const resetFont = () => {
    setFontSize(16)
    document.documentElement.style.fontSize = "16px"
  }

  const toggleHighContrast = () => {
    document.body.classList.toggle("high-contrast")
  }

  return (
    <nav className="navbar">
      <h2 className="logo">
        <Link to="/">ISA Project</Link>
      </h2>

      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/about">Acerca</Link>
        <Link to="/products">Productos</Link>
        <Link to="/cart">
          <FaShoppingCart /> Carrito
        </Link>
        <Link to="/developers">Desarrolladores</Link>
        <Link to="/pqr">PQR</Link>
        <Link to="/login">
          <FaUser /> Login
        </Link>
      </div>

      <div className="accessibility-buttons">
        <button onClick={increaseFont} aria-label="Aumentar texto">A+</button>
        <button onClick={decreaseFont} aria-label="Disminuir texto">A-</button>
        <button onClick={resetFont} aria-label="Resetear texto">A</button>
        <button onClick={toggleHighContrast} aria-label="Alto contraste">
          <FaUniversalAccess />
        </button>
      </div>
    </nav>
  )
}

export default Navbar