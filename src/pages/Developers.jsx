import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import "../styles/developers.css"

// API virtual con localStorage
const STORAGE_KEY = "developers"

const developersIniciales = [
  { id: 1, nombre: "Dayanne Daniela Rodriguez", foto: "https://randomuser.me/api/portraits/women/1.jpg", celular: "3001234567", email: "daniela@gmail.com", perfil: "Frontend Developer" },
  { id: 2, nombre: "Dylan Vargas Mendieta", foto: "https://randomuser.me/api/portraits/men/2.jpg", celular: "3007654321", email: "dylan@gmail.com", perfil: "Backend Developer" }
]

function Developers() {
  const [developers, setDevelopers] = useState([])
  const [formData, setFormData] = useState({ nombre: "", foto: "", celular: "", email: "", perfil: "" })
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

    if (editando) {
      guardarEnLocal(developers.map(d => d.id === editando ? { ...formData, id: editando } : d))
      setEditando(null)
    } else {
      const nuevoId = Math.max(...developers.map(d => d.id), 0) + 1
      guardarEnLocal([...developers, { ...formData, id: nuevoId }])
    }
    setFormData({ nombre: "", foto: "", celular: "", email: "", perfil: "" })
  }

  const handleEdit = (dev) => {
    setEditando(dev.id)
    setFormData(dev)
  }

  const handleDelete = (id) => {
    if (confirm("¿Eliminar este desarrollador?")) {
      guardarEnLocal(developers.filter(d => d.id !== id))
    }
  }

  return (
    <>
      <Navbar />
      <div className="developers-container">
        <h1>👩‍💻 Equipo de Desarrollo</h1>

        <form onSubmit={handleSubmit} className="dev-form">
          <h3>{editando ? "Editar" : "Agregar"} Desarrollador</h3>
          <input type="text" placeholder="Nombre completo" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />
          <input type="text" placeholder="URL de foto" value={formData.foto} onChange={e => setFormData({ ...formData, foto: e.target.value })} />
          <input type="tel" placeholder="Celular (10 dígitos)" value={formData.celular} onChange={e => setFormData({ ...formData, celular: e.target.value })} required />
          <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
          <input type="text" placeholder="Perfil/Rol" value={formData.perfil} onChange={e => setFormData({ ...formData, perfil: e.target.value })} />
          <button type="submit">{editando ? "Actualizar" : "Guardar"}</button>
          {editando && <button type="button" onClick={() => { setEditando(null); setFormData({ nombre: "", foto: "", celular: "", email: "", perfil: "" }) }}>Cancelar</button>}
        </form>

        <div className="developers-grid">
          {developers.map(dev => (
            <div key={dev.id} className="dev-card">
              <img src={dev.foto || "https://via.placeholder.com/150"} alt={dev.nombre} />
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

export default Developers