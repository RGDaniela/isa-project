import Navbar from "../components/Navbar"

function About() {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Acerca del Proyecto</h1>

        <p>
          Este proyecto fue desarrollado con React y Vite.
        </p>

        <p>
          ISA Project permite gestionar información de usuarios.
        </p>
      </div>
    </>
  )
}

export default About