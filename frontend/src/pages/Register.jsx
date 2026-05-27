import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;

    if (!nameRegex.test(form.name))
      return "Nombre inválido";

    if (!form.name) return "Nombre obligatorio";
    if (!emailRegex.test(form.email)) return "Email inválido";
    if (!passwordRegex.test(form.password))
      return "Password débil (mayúscula, minúscula, número, 6+ caracteres)";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      Swal.fire("Error", error, "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: "user", // 🔥 fijo
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.error || "Error", "error");
        return;
      }

      Swal.fire("OK", "Usuario creado correctamente", "success");

      navigate("/login");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Servidor no disponible", "error");
    }
  };

 return (
    <div className="register-container">

      <form
        onSubmit={handleSubmit}
        className="register-card"
      >

        <h1 className="register-title">
          Crear Cuenta
        </h1>

        <p className="register-subtitle">
          Regístrate para acceder a los servicios de ISA Project
        </p>

        <input
          className="register-input"
          name="name"
          placeholder="Nombre completo"
          onChange={handleChange}
        />

        <input
          className="register-input"
          name="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
        />

        <input
          className="register-input"
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <div className="register-help">
          La contraseña debe contener:
          <br />
          • Una letra mayúscula
          <br />
          • Una letra minúscula
          <br />
          • Un número
          <br />
          • Mínimo 6 caracteres
        </div>

        <button
          type="submit"
          className="register-button"
        >
          Crear Cuenta
        </button>

        <div className="register-login-link">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">
            Inicia sesión
          </Link>
        </div>

      </form>

    </div>
  ); 
}



export default Register;