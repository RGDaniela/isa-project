import { useState } from "react";

function About() {
  const [acordeonAbierto, setAcordeonAbierto] = useState(null);

  const toggleAcordeon = (index) => {
    setAcordeonAbierto(acordeonAbierto === index ? null : index);
  };

  const secciones = [
    {
      titulo: "🎯 Misión",
      contenido:
        "En ISA Project nos dedicamos a ofrecer productos y servicios de alta calidad, impulsando la innovación tecnológica y brindando soluciones que mejoren la vida de nuestros usuarios. Nos comprometemos con la excelencia, la mejora continua y la experiencia del cliente."
    },
    {
      titulo: "👁️ Visión",
      contenido:
        "Ser una plataforma reconocida en América Latina por la calidad de nuestras soluciones digitales, destacándonos en innovación, accesibilidad y transformación tecnológica para el año 2030."
    },
    {
      titulo: "🏆 Objetivos",
      contenido:
        "1. Expandir la plataforma a nuevos mercados.\n2. Mejorar la experiencia del usuario constantemente.\n3. Implementar buenas prácticas de desarrollo.\n4. Garantizar estabilidad y escalabilidad del sistema.\n5. Fomentar la educación tecnológica."
    },
    {
      titulo: "🔐 Manejo de datos personales",
      contenido:
        "ISA Project recopila únicamente los datos necesarios para el funcionamiento de la plataforma.\n\n📊 Datos que se almacenan:\n- Nombre completo\n- Correo electrónico\n- Número de contacto\n- Información de perfil\n- Historial de PQR y actividad en la plataforma\n\n🎯 Uso de los datos:\n- Autenticación de usuarios\n- Soporte y atención de solicitudes\n- Personalización de la experiencia\n\n🛡️ Seguridad:\n- Control de acceso por roles (usuario y desarrollador)\n- Acceso restringido a información sensible\n\n👤 Derechos del usuario:\n- Acceder a su información\n- Actualizar sus datos\n- Solicitar eliminación de cuenta (según disponibilidad del sistema)"
    },
    {
      titulo: "📍 Ubicación de las oficinas",
      contenido: (
        <>
          <p style={{ marginBottom: "15px" }}>
            ISA Project opera desde Bogotá D.C., Colombia, cerca de la
            Universidad Libre Sede El Bosque, brindando servicios y
            soluciones tecnológicas para nuestros usuarios.
          </p>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.583980575896!2d-74.10616082591079!3d4.6680159419418965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b9e2b2a82a1%3A0x761d0701a1e01f06!2sUniversidad%20Libre%20Sede%20El%20Bosque!5e0!3m2!1ses!2sco!4v1779767093965!5m2!1ses!2sco"
            width="100%"
            height="350"
            style={{
              border: 0,
              borderRadius: "10px",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa ISA Project"
          />
        </>
      )
    }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sobre ISA Project</h1>

      <p style={styles.subtitle}>
        Conoce nuestra empresa, nuestros valores y cómo manejamos tu información
      </p>

      <div style={styles.acordeonContainer}>
        {secciones.map((seccion, index) => (
          <div key={index} style={styles.acordeonItem}>
            <button
              style={styles.acordeonHeader}
              onClick={() => toggleAcordeon(index)}
            >
              <span>{seccion.titulo}</span>
              <span>
                {acordeonAbierto === index ? "▲" : "▼"}
              </span>
            </button>

            {acordeonAbierto === index && (
              <div style={styles.acordeonContenido}>
                <div style={styles.acordeonTexto}>
                  {seccion.contenido}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
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
  },

  acordeonContenido: {
    padding: "1rem",
    backgroundColor: "#f9f9f9",
  },

  acordeonTexto: {
    lineHeight: 1.6,
    color: "#333",
    whiteSpace: "pre-line",
  },
};

export default About;