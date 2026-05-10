import { useState } from "react"
import Navbar from "../components/Navbar"
import "../styles/home.css"
import UserForm from "../components/UserForm"

function Home() {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Dayanne Daniela Rodriguez Ginzalez",
      correo: "daniela@gmail.com",
    },
    {
      id: 2,
      nombre: "Dylan Vargas Mendieta",
      correo: "Dylan@gmail.com",
    },
  ])

  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios([
      ...usuarios,
      {
        id: usuarios.length + 1,
        ...nuevoUsuario,
      },
    ])
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Bienvenida al ISA Project 🚀</h1>

        <UserForm onAddUser={agregarUsuario} />

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home