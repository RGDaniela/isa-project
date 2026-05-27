import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Empresa */}
        <div className="footer-section">
          <h3>ISA Project</h3>

          <p>
            Innovación tecnológica enfocada en soluciones
            digitales modernas y accesibles.
          </p>
        </div>

        {/* Navegación */}
        <div className="footer-section">
          <h3>Navegación</h3>

          <ul>
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>

            <li>
              <NavLink to="/plans">Planes</NavLink>
            </li>

            <li>
              <NavLink to="/developers">Desarrolladores</NavLink>
            </li>

            <li>
              <NavLink to="/pqr">PQR</NavLink>
            </li>
          </ul>
        </div>

        {/* Redes */}
        <div className="footer-section">
          <h3>Redes Sociales</h3>

          <div className="social-icons">

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>

          </div>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h3>Legal</h3>

          <p>
            <NavLink to="/about">Política de privacidad</NavLink>
          </p>

          <p>
            <NavLink to="/about">Manejo de datos personales</NavLink>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ISA Project - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;