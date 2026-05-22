// src/pages/Home.jsx
import { useState } from "react";
import Slider from "../components/Slider";
import UserForm from "../components/UserForm";
import UsersTable from "../components/UsersTable";

import "../styles/home.css";

function Home() {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Dayanne Daniela Rodriguez Gonzalez",
      correo: "daniela@gmail.com",
    },
    {
      id: 2,
      nombre: "Dylan Vargas Mendieta",
      correo: "dylan@gmail.com",
    },
  ]);

  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios([
      ...usuarios,
      {
        id: usuarios.length + 1,
        ...nuevoUsuario,
      },
    ]);
  };

  return (
    <div className="container">
      <Slider />

      <section className="hero-section">
        <h1>Bienvenida al ISA Project 🚀</h1>

        <p>
          Innovación tecnológica enfocada en soluciones
          modernas, accesibles y eficientes.
        </p>
      </section>


      <UserForm onAddUser={agregarUsuario} />

      <UsersTable usuarios={usuarios} />
    </div>
  );
}

export default Home;