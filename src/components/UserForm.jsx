import { useState } from "react"

function UserForm({ onAddUser }) {
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    onAddUser({
      nombre,
      correo,
    })

    setNombre("")
    setCorreo("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <button type="submit">
        Registrar
      </button>
    </form>
  )
}

export default UserForm