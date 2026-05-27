import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  async function onSubmit(formData) {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: data.error,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return;
      }

      login(data.user);

      Swal.fire({
        title: "Bienvenida 🚀",
        text: "Login exitoso",
        icon: "success",
        confirmButtonText: "Continuar",
      });

      navigate("/");
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error",
        text: "No se pudo conectar con el servidor",
        icon: "error",
      });
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h1 style={styles.title}>Login</h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Correo"
          style={styles.input}
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Formato de correo inválido",
            },
            validate: (value) =>
              value.trim().length > 0 || "El correo no puede estar vacío",
          })}
        />

        {errors.email && (
          <p style={styles.error}>{errors.email.message}</p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Contraseña"
          style={styles.input}
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Mínimo 6 caracteres",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message:
                "Debe tener mayúscula, minúscula y número",
            },
          })}
        />

        {errors.password && (
          <p style={styles.error}>{errors.password.message}</p>
        )}

        <button
          type="submit"
          style={{
            ...styles.button,
            opacity: isSubmitting ? 0.6 : 1,
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f3f4f6",
  },

  form: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    color: "#0f172a",
    marginBottom: "10px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
  },

  error: {
    color: "red",
    fontSize: "14px",
    margin: 0,
  },
};

export default Login;