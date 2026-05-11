import { useState, useEffect } from "react"
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

  // SLIDER
  const [slideActual, setSlideActual] = useState(0)

  const slides = [
    { id: 1, imagen: "https://picsum.photos/id/20/800/400", titulo: "Bienvenidos a ISA Project", descripcion: "Innovación y calidad en tecnología" },
    { id: 2, imagen: "https://picsum.photos/id/26/800/400", titulo: "Productos de alta calidad", descripcion: "Los mejores precios del mercado" },
    { id: 3, imagen: "https://picsum.photos/id/30/800/400", titulo: "Ofertas especiales", descripcion: "Hasta 50% de descuento" },
    { id: 4, imagen: "https://picsum.photos/id/42/800/400", titulo: "Envíos a todo el país", descripcion: "Entregas rápidas y seguras" },
    { id: 5, imagen: "https://picsum.photos/id/55/800/400", titulo: "Soporte 24/7", descripcion: "Siempre contigo" }
  ]

  // AUTOPLAY - El slider se mueve solo cada 4 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % slides.length)
    }, 4000) // Cambia cada 4 segundos

    return () => clearInterval(intervalo) // Limpia el intervalo cuando el componente se desmonta
  }, [slides.length])

  const siguienteSlide = () => {
    setSlideActual((prev) => (prev + 1) % slides.length)
  }

  const anteriorSlide = () => {
    setSlideActual((prev) => (prev - 1 + slides.length) % slides.length)
  }

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
        {/* SLIDER */}
        <div className="slider-container">
          <button className="slider-btn prev" onClick={anteriorSlide}>❮</button>
          <div className="slide">
            <img src={slides[slideActual].imagen} alt={slides[slideActual].titulo} />
            <div className="slide-text">
              <h2>{slides[slideActual].titulo}</h2>
              <p>{slides[slideActual].descripcion}</p>
            </div>
          </div>
          <button className="slider-btn next" onClick={siguienteSlide}>❯</button>
        </div>
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === slideActual ? "active" : ""}`}
              onClick={() => setSlideActual(index)}
            ></span>
          ))}
        </div>

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