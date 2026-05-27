import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.png";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";

import {
  FaShoppingCart,
  FaUser,
  FaUniversalAccess,
  FaTools,
  FaUsers,
  FaChartLine,
  FaUserCog,
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [planMenuOpen, setPlanMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const isDev = user?.role === "developer";

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        <NavLink to="/">
          <img
            src={logo}
            alt="ISA Project"
            className="logo-image"
          />
        </NavLink>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* LINKS PRINCIPALES */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <NavLink to="/about">Acerca</NavLink>

        {/* PLANES DROPDOWN (100% CLICK, SIN CSS MAGICO) */}
        <div className="dropdown">

          <button
            className="dropdown-btn"
            onClick={() => setPlanMenuOpen(!planMenuOpen)}
          >
            <FaShoppingCart /> Planes ▾
          </button>

          {planMenuOpen && (
            <div className="dropdown-menu">

              <NavLink
                to="/plans"
                onClick={() => setPlanMenuOpen(false)}
              >
                Ver planes
              </NavLink>

              <NavLink
                to="/suscription"
                onClick={() => setPlanMenuOpen(false)}
              >
                Suscripción
              </NavLink>

            </div>
          )}
        </div>

        <NavLink to="/developers">
          <FaUsers /> Developers
        </NavLink>

        <NavLink to="/pqr">PQR</NavLink>
      </div>

      {/* OPCIONES DEV */}
      {isDev && (
        <div className={`nav-links dev-panel ${menuOpen ? "active" : ""}`}>

          <NavLink to="/users">
            <FaUserCog /> Usuarios
          </NavLink>

        </div>
      )}

      {/* USUARIO */}
      <div className="auth-section">

        {user ? (
          <div className="user-menu">

            <span
              className="user-badge"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <FaUser /> {user.name} {isDev && "(DEV)"}
            </span>

            {userMenuOpen && (
              <div className="dropdown-menu">
                <button onClick={logout}>
                  Cerrar sesión
                </button>
              </div>
            )}

          </div>
        ) : (
          <div className="guest-links">

            <NavLink to="/login" className="auth-link">
              <FaUser /> Login
            </NavLink>

            <NavLink to="/register" className="auth-link register-link">
              Crear cuenta
            </NavLink>

          </div>
        )}

      </div>

      {/* ACCESIBILIDAD */}
      <div className="accessibility-buttons">

        <button>A+</button>
        <button>A-</button>
        <button>A</button>

        <button onClick={() => document.body.classList.toggle("high-contrast")}>
          <FaUniversalAccess />
        </button>

      </div>

    </nav>
  );
}

export default Navbar;