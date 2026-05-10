import { useForm } from "react-hook-form"
import Swal from "sweetalert2"

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  function onSubmit(data) {
  console.log(data)

  Swal.fire({
    title: "Bienvenida 🚀",
    text: "Login exitoso",
    icon: "success",
    confirmButtonText: "Continuar",
  })
}

  return (
    <div style={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={styles.form}
      >
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Correo"
          style={styles.input}
          {...register("email", {
            required: "El correo es obligatorio",
          })}
        />

        {errors.email && (
          <p style={styles.error}>
            {errors.email.message}
          </p>
        )}

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
          })}
        />

        {errors.password && (
          <p style={styles.error}>
            {errors.password.message}
          </p>
        )}

        <button type="submit" style={styles.button}>
          Ingresar
        </button>
      </form>
    </div>
  )
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

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
  },

  error: {
    color: "red",
    fontSize: "14px",
    margin: 0,
  },
}

export default Login