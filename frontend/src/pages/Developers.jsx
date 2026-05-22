import { useState, useEffect } from "react"
import "../styles/developers.css"

// API virtual con localStorage
const STORAGE_KEY = "developers"

const developersIniciales = [
  { id: 1, nombre: "Dayanne Daniela Rodriguez", foto: null, celular: "3001234567", email: "daniela@gmail.com", perfil: "Frontend Developer" },
  { id: 2, nombre: "Dylan Vargas Mendieta", foto: null, celular: "3007654321", email: "dylan@gmail.com", perfil: "Backend Developer" }
]

function Developers() {
  const [developers, setDevelopers] = useState([])
  const [formData, setFormData] = useState({ nombre: "", foto: null, fotoPreview: "", celular: "", email: "", perfil: "" })
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setDevelopers(JSON.parse(stored))
    } else {
      setDevelopers(developersIniciales)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(developersIniciales))
    }
  }, [])

  const guardarEnLocal = (nuevosDevelopers) => {
    setDevelopers(nuevosDevelopers)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosDevelopers))
  }

  // Manejar la selección de imagen desde el PC
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, foto: reader.result, fotoPreview: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validaciones
    if (!formData.nombre || !formData.celular || !formData.email) {
      alert("Por favor complete nombre, celular y email")
      return
    }
    const celularRegex = /^3\d{9}$/
    if (!celularRegex.test(formData.celular)) {
      alert("Celular inválido. Debe ser 10 dígitos comenzando con 3")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Email inválido")
      return
    }

    const nuevoDesarrollador = {
      nombre: formData.nombre,
      foto: formData.foto || null,
      celular: formData.celular,
      email: formData.email,
      perfil: formData.perfil
    }

    if (editando) {
      guardarEnLocal(developers.map(d => d.id === editando ? { ...nuevoDesarrollador, id: editando } : d))
      setEditando(null)
    } else {
      const nuevoId = Math.max(...developers.map(d => d.id), 0) + 1
      guardarEnLocal([...developers, { ...nuevoDesarrollador, id: nuevoId }])
    }
    setFormData({ nombre: "", foto: null, fotoPreview: "", celular: "", email: "", perfil: "" })
    // Resetear el input file
    const fileInput = document.getElementById("fotoInput")
    if (fileInput) fileInput.value = ""
  }

  const handleEdit = (dev) => {
    setEditando(dev.id)
    setFormData({
      nombre: dev.nombre,
      foto: dev.foto,
      fotoPreview: dev.foto,
      celular: dev.celular,
      email: dev.email,
      perfil: dev.perfil || ""
    })
  }

  const handleDelete = (id) => {
    if (confirm("¿Eliminar este desarrollador?")) {
      guardarEnLocal(developers.filter(d => d.id !== id))
    }
  }

  return (
    <>
      <div className="developers-container">
        <h1>👩‍💻 Equipo de Desarrollo</h1>

        <form onSubmit={handleSubmit} className="dev-form">
          <h3>{editando ? "Editar" : "Agregar"} Desarrollador</h3>
          
          <input
            type="text"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={e => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
          
          {/* Botón para subir imagen desde el PC */}
          <div style={styles.imageUploadContainer}>
            <label style={styles.imageLabel}>
              📸 Subir foto desde el PC
              <input
                id="fotoInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.fileInput}
              />
            </label>
            {formData.fotoPreview && (
              <div style={styles.previewContainer}>
                <img src={formData.fotoPreview} alt="Vista previa" style={styles.previewImage} />
                <button 
                  type="button" 
                  onClick={() => setFormData({ ...formData, foto: null, fotoPreview: "" })}
                  style={styles.removeBtn}
                >
                  ❌ Eliminar
                </button>
              </div>
            )}
          </div>
          
          <input
            type="tel"
            placeholder="Celular (10 dígitos)"
            value={formData.celular}
            onChange={e => setFormData({ ...formData, celular: e.target.value })}
            required
          />
          
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
          
          <input
            type="text"
            placeholder="Perfil/Rol"
            value={formData.perfil}
            onChange={e => setFormData({ ...formData, perfil: e.target.value })}
          />
          
          <button type="submit">{editando ? "Actualizar" : "Guardar"}</button>
          {editando && (
            <button type="button" onClick={() => {
              setEditando(null)
              setFormData({ nombre: "", foto: null, fotoPreview: "", celular: "", email: "", perfil: "" })
            }}>
              Cancelar
            </button>
          )}
        </form>

        <div className="developers-grid">
          {developers.map(dev => (
            <div key={dev.id} className="dev-card">
              <img 
                src={dev.foto || "https://via.placeholder.com/150"} 
                alt={dev.nombre} 
                style={styles.cardImage}
              />
              <h3>{dev.nombre}</h3>
              <p>📞 {dev.celular}</p>
              <p>📧 {dev.email}</p>
              <p>💼 {dev.perfil}</p>
              <div className="dev-actions">
                <button onClick={() => handleEdit(dev)}>✏️ Editar</button>
                <button onClick={() => handleDelete(dev.id)}>🗑️ Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const styles = {
  imageUploadContainer: {
    marginBottom: "10px",
  },
  imageLabel: {
    display: "block",
    padding: "10px",
    backgroundColor: "#e94560",
    color: "white",
    textAlign: "center",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "10px",
  },
  fileInput: {
    display: "none",
  },
  previewContainer: {
    marginTop: "10px",
    textAlign: "center",
  },
  previewImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  removeBtn: {
    marginTop: "5px",
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
  },
  cardImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
  },
}

export default Developers