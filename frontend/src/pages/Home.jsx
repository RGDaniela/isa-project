// Home.jsx
import Slider from "../components/Slider";
import "../styles/home.css";

function Home() {
  return (
    <div className="container">

      <Slider />

      <section className="hero-section">
        <h1>Bienvenida a ISA Project 🚀</h1>

        <p>
          Plataforma desarrollada por VR Talent para optimizar
          procesos de selección mediante entrevistas automatizadas,
          gestión de candidatos y herramientas digitales innovadoras.
        </p>
      </section>

      <section className="features-section">

        <div className="feature-card">
          <h2>🎯 Entrevistas Automatizadas</h2>
          <p>
            Diseña y configura entrevistas personalizadas para
            diferentes perfiles profesionales.
          </p>
        </div>

        <div className="feature-card">
          <h2>📊 Evaluación Inteligente</h2>
          <p>
            Centraliza resultados y obtén información clara para
            apoyar la toma de decisiones.
          </p>
        </div>

        <div className="feature-card">
          <h2>⚡ Gestión Eficiente</h2>
          <p>
            Reduce tiempos operativos y mejora la experiencia
            tanto para reclutadores como para candidatos.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;