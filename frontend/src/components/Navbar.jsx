import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

import { useAuth } from "../context/AuthContext";

import {
  FaShoppingCart,
  FaUser,
  FaUniversalAccess,
  FaTools,
} from "react-icons/fa";

import { useState } from "react";

function Navbar() {
  const [fontSize, setFontSize] = useState(16);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useAuth();

  const isDev = user?.role === "developer";

  const increaseFont = () => {
    if (fontSize < 24) {
      const newSize = fontSize + 2;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  };

  const decreaseFont = () => {
    if (fontSize > 12) {
      const newSize = fontSize - 2;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  };

  const resetFont = () => {
    setFontSize(16);
    document.documentElement.style.fontSize = "16px";
  };

  const toggleHighContrast = () => {
    document.body.classList.toggle("high-contrast");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        <NavLink to="/">ISA Project</NavLink>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* LINKS BASE (TODOS) */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/about">Acerca</NavLink>
        <NavLink to="/products">Productos</NavLink>
        <NavLink to="/cart">
          <FaShoppingCart /> Carrito
        </NavLink>
        <NavLink to="/pqr">PQR</NavLink>
      </div>

      {/* LINKS SOLO DEV */}
      {isDev && (
        <div className={`nav-links dev-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/users">
            <FaTools /> Usuarios
          </NavLink>

          <NavLink to="/dashboard">
            <FaTools /> Dashboard
          </NavLink>
        </div>
      )}

      {/* LOGIN / USER INFO */}
      <div className="auth-section">
        {user ? (
          <span className="user-badge">
            {user.name} {isDev && "(DEV)"}
          </span>
        ) : (
          <NavLink to="/login">
            <FaUser /> Login
          </NavLink>
        )}
      </div>

      {/* ACCESIBILIDAD */}
      <div className="accessibility-buttons">
        <button onClick={increaseFont}>A+</button>
        <button onClick={decreaseFont}>A-</button>
        <button onClick={resetFont}>A</button>

        <button onClick={toggleHighContrast}>
          <FaUniversalAccess />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;