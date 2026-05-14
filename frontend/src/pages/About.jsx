import Navbar from "../components/Navbar"
import { useState } from "react"

function About() {
  const [acordeonAbierto, setAcordeonAbierto] = useState(null)

  const toggleAcordeon = (index) => {
    if (acordeonAbierto === index) {
      setAcordeonAbierto(null)
    } else {
      setAcordeonAbierto(index)
    }
  }

  const secciones = [
    {
      titulo: "🎯 Misión",
      contenido: "En ISA Project nos dedicamos a ofrecer productos y servicios de alta calidad, impulsando la innovación tecnológica y brindando soluciones que mejoren la vida de nuestros clientes. Nos comprometemos con la excelencia, la sostenibilidad y la satisfacción total de quienes confían en nosotros."
    },
    {
      titulo: "👁️ Visión",
      contenido: "Ser reconocidos para el año 2030 como la empresa líder en soluciones tecnológicas innovadoras en América Latina, destacándonos por nuestra calidad, compromiso social y capacidad de adaptación a las necesidades cambiantes del mercado digital."
    },
    {
      titulo: "🏆 Objetivos",
      contenido: "1. Expandir nuestra presencia digital a 5 países para 2028.\n2. Alcanzar un 95% de satisfacción del cliente mediante mejoras continuas.\n3. Implementar tecnologías sostenibles en todos nuestros procesos productivos.\n4. Capacitar a nuestro equipo anualmente en las últimas tecnologías.\n5. Contribuir al desarrollo de la comunidad tecnológica local."
    }
  ]

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>Sobre ISA Project</h1>
        <p style={styles.subtitle}>Conoce nuestra empresa, nuestros valores y objetivos</p>

        <div style={styles.acordeonContainer}>
          {secciones.map((seccion, index) => (
            <div key={index} style={styles.acordeonItem}>
              <button
                style={styles.acordeonHeader}
                onClick={() => toggleAcordeon(index)}
              >
                <span style={styles.acordeonTitulo}>{seccion.titulo}</span>
                <span style={styles.acordeonIcono}>
                  {acordeonAbierto === index ? "▲" : "▼"}
                </span>
              </button>
              {acordeonAbierto === index && (
                <div style={styles.acordeonContenido}>
                  <p style={styles.acordeonTexto}>{seccion.contenido}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "0 1rem",
  },
  title: {
    textAlign: "center",
    color: "#1a1a2e",
    marginBottom: "0.5rem",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "2rem",
  },
  acordeonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  acordeonItem: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  acordeonHeader: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  acordeonTitulo: {
    textAlign: "left",
  },
  acordeonIcono: {
    fontSize: "1.2rem",
  },
  acordeonContenido: {
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderTop: "1px solid #eee",
  },
  acordeonTexto: {
    margin: 0,
    lineHeight: 1.6,
    color: "#333",
    whiteSpace: "pre-line",
  },
}

export default About