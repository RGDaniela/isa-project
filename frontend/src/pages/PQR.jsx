import { useState } from "react"

function PQR() {
  const [tipo, setTipo] = useState("peticion")
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [errores, setErrores] = useState({})

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio"
    }

    if (!email.trim()) {
      nuevosErrores.email = "El correo es obligatorio"
    } else {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!regexEmail.test(email)) {
        nuevosErrores.email = "Correo electrónico inválido"
      }
    }

    if (!mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje es obligatorio"
    } else if (mensaje.trim().length < 10) {
      nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validarFormulario()) {
      alert(`✅ ${tipo.toUpperCase()} enviada con éxito. Nos comunicaremos pronto.`)
      setNombre("")
      setEmail("")
      setMensaje("")
      setTipo("peticion")
      setErrores({})
    }
  }

  return (
    <>
      <div style={styles.container}>
        <h1>📝 Peticiones, Quejas y Reclamos</h1>
        <p>Déjanos tu mensaje y te atenderemos lo antes posible</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Tipo de solicitud:</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              style={styles.select}
            >
              <option value="peticion">📄 Petición</option>
              <option value="queja">⚠️ Queja</option>
              <option value="reclamo">💰 Reclamo</option>
              <option value="sugerencia">💡 Sugerencia</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Nombre completo:</label>
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ ...styles.input, ...(errores.nombre && styles.inputError) }}
            />
            {errores.nombre && <span style={styles.error}>{errores.nombre}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Correo electrónico:</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...styles.input, ...(errores.email && styles.inputError) }}
            />
            {errores.email && <span style={styles.error}>{errores.email}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Mensaje:</label>
            <textarea
              placeholder="Describe tu petición, queja o reclamo..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              style={{ ...styles.textarea, ...(errores.mensaje && styles.inputError) }}
              rows="5"
            />
            {errores.mensaje && <span style={styles.error}>{errores.mensaje}</span>}
          </div>

          <button type="submit" style={styles.button}>
            Enviar solicitud
          </button>
        </form>
      </div>
    </>
  )
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "0 1rem",
  },
  form: {
    background: "#f5f5f5",
    padding: "2rem",
    borderRadius: "10px",
    marginTop: "1rem",
  },
  field: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    fontFamily: "inherit",
  },
  select: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  inputError: {
    borderColor: "#dc3545",
    outlineColor: "#dc3545",
  },
  error: {
    color: "#dc3545",
    fontSize: "12px",
    marginTop: "5px",
    display: "block",
  },
  button: {
    background: "#e94560",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    fontWeight: "bold",
  },
}

export default PQR