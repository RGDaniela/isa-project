import { FaInstagram, FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa"

function Footer() {
  const redesSociales = [
    {
      nombre: "Instagram",
      icono: <FaInstagram />,
      url: "https://instagram.com",
      color: "#E4405F"
    },
    {
      nombre: "Facebook",
      icono: <FaFacebook />,
      url: "https://facebook.com",
      color: "#1877F2"
    },
    {
      nombre: "WhatsApp",
      icono: <FaWhatsapp />,
      url: "https://wa.me/573001234567",
      color: "#25D366"
    },
    {
      nombre: "LinkedIn",
      icono: <FaLinkedin />,
      url: "https://linkedin.com",
      color: "#0A66C2"
    }
  ]

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.seccion}>
          <h3 style={styles.logo}>ISA Project</h3>
          <p style={styles.descripcion}>
            Innovación y calidad en soluciones tecnológicas.
            Transformando ideas en realidad.
          </p>
        </div>

        <div style={styles.seccion}>
          <h4 style={styles.titulo}>Enlaces rápidos</h4>
          <ul style={styles.lista}>
            <li><a href="/" style={styles.enlace}>Inicio</a></li>
            <li><a href="/about" style={styles.enlace}>Acerca de</a></li>
            <li><a href="/products" style={styles.enlace}>Productos</a></li>
            <li><a href="/pqr" style={styles.enlace}>PQR</a></li>
          </ul>
        </div>

        <div style={styles.seccion}>
          <h4 style={styles.titulo}>Síguenos</h4>
          <div style={styles.redesContainer}>
            {redesSociales.map((red) => (
              <a
                key={red.nombre}
                href={red.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.redIcono, backgroundColor: red.color }}
                aria-label={red.nombre}
              >
                {red.icono}
              </a>
            ))}
          </div>
        </div>

        <div style={styles.seccion}>
          <h4 style={styles.titulo}>Contacto</h4>
          <p style={styles.contacto}>📞 +57 300 123 4567</p>
          <p style={styles.contacto}>✉️ info@isaproject.com</p>
          <p style={styles.contacto}>📍 Bogotá, Colombia</p>
        </div>
      </div>

      <div style={styles.copyright}>
        <p>© 2026 ISA Project - Todos los derechos reservados</p>
        <p>Desarrollado con ❤️ para el curso ISA</p>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: "#1a1a2e",
    color: "white",
    marginTop: "4rem",
    paddingTop: "2rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  },
  seccion: {
    marginBottom: "1.5rem",
  },
  logo: {
    color: "#e94560",
    marginBottom: "1rem",
    fontSize: "1.5rem",
  },
  descripcion: {
    lineHeight: 1.6,
    color: "#ccc",
  },
  titulo: {
    marginBottom: "1rem",
    fontSize: "1.2rem",
    color: "#e94560",
  },
  lista: {
    listStyle: "none",
    padding: 0,
  },
  enlace: {
    color: "#ccc",
    textDecoration: "none",
    lineHeight: 2,
    transition: "color 0.3s",
  },
  redesContainer: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  redIcono: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    color: "white",
    fontSize: "1.2rem",
    transition: "transform 0.3s",
    textDecoration: "none",
  },
  contacto: {
    margin: "0.5rem 0",
    color: "#ccc",
  },
  copyright: {
    textAlign: "center",
    padding: "1.5rem",
    borderTop: "1px solid #333",
    marginTop: "2rem",
    fontSize: "0.9rem",
    color: "#888",
  },
}

// Agregar hover a los enlaces con CSS
const styleSheet = document.createElement("style")
styleSheet.textContent = `
  a:hover {
    color: #e94560 !important;
  }
  .red-icono:hover {
    transform: scale(1.1);
  }
`
document.head.appendChild(styleSheet)

export default Footer