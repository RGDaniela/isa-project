 import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";

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
            <li>Inicio</li>
            <li>Productos</li>
            <li>Desarrolladores</li>
            <li>PQR</li>
          </ul>
        </div>

        {/* Redes */}
        <div className="footer-section">
          <h3>Redes Sociales</h3>

          <div className="social-icons">
            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaFacebook />
            </a>

            <a href="#">
              <FaWhatsapp />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h3>Legal</h3>

          <p>Política de privacidad</p>
          <p>Manejo de datos personales</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ISA Project - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;