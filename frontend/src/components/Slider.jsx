// src/components/Slider.jsx

import { useState, useEffect } from "react";

import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import slide4 from "../assets/slide4.png";
import slide5 from "../assets/slide5.png";



function Slider() {
  const [slideActual, setSlideActual] = useState(0);

    const slides = [
    {
      id: 1,
      imagen: slide1,
      titulo: "Bienvenidos a VyR Talent",
      descripcion: "En VR Talent utilizamos soluciones tecnológicas innovadoras para optimizar procesos, potenciar equipos de trabajo y crear nuevas oportunidades de crecimiento.",
    },
    {
      id: 2,
      imagen: slide2,
      titulo: "Proyecto ISA",
      descripcion: "En VR Talent desarrollamos soluciones tecnológicas que ayudan a las organizaciones a optimizar procesos, aumentar su productividad y adaptarse a los retos del entorno digital.",
    },
    {
      id: 3,
      imagen: slide3,
      titulo: "Innovación que impulsa resultados",
      descripcion: "ISA Project permite diseñar, gestionar y automatizar procesos de selección mediante entrevistas digitales, optimizando la evaluación de candidatos y mejorando la eficiencia del reclutamiento.",
    },
    {
      id: 4,
      imagen: slide4,
      titulo: "Liderando la transformación digital",
      descripcion: "Acompañamos a las empresas en la implementación de herramientas tecnológicas que fortalecen la toma de decisiones y mejoran la eficiencia operativa.",
    },
    {
      id: 5,
      imagen: slide5,
      titulo: "Conectando talento y tecnología",
      descripcion: "Creemos en el poder de la tecnología para potenciar el talento humano, crear oportunidades de crecimiento y generar valor sostenible para las organizaciones.",
    },
   
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, [slides.length]);

  const siguienteSlide = () => {
    setSlideActual((prev) => (prev + 1) % slides.length);
  };

  const anteriorSlide = () => {
    setSlideActual((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <div className="slider-container">
        <button className="slider-btn prev" onClick={anteriorSlide}>
          ❮
        </button>

        <div className="slide">
          <img
            src={slides[slideActual].imagen}
            alt={slides[slideActual].titulo}
          />

          <div className="slide-text">
            <h2>{slides[slideActual].titulo}</h2>
            <p>{slides[slideActual].descripcion}</p>
          </div>
        </div>

        <button className="slider-btn next" onClick={siguienteSlide}>
          ❯
        </button>
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
    </>
  );
}

export default Slider;