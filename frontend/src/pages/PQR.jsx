import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";


import "../styles/pqr.css";

function PQR() {

  const { user } = useAuth();

  const [tipo, setTipo] = useState("peticion");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  const [errores, setErrores] = useState({});
  const [pqrs, setPqrs] = useState([]);
  const [respuestaDev, setRespuestaDev] = useState({});
  const [estadoDev, setEstadoDev] = useState({});
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {

    if (!user) return;

    cargarPQR();

  }, [user]);

  const cargarPQR = async () => {
    try {

      setLoading(true);

      let url = "";

      if (user.role === "developer") {
        url = "http://localhost:3000/api/pqr";
      } else {
        url = `http://localhost:3000/api/pqr/user/${user.id}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setPqrs(data);

    } catch (error) {

      console.error(error);
      setPqrs([]);

    } finally {

      setLoading(false);

    }

  };
  const actualizarPQR = async (id) => {

    try {

      setGuardando(true);

      const res = await fetch(
        `http://localhost:3000/api/pqr/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            respuesta: respuestaDev[id] || "",
            estado: estadoDev[id] || "PENDIENTE",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("PQR actualizado correctamente");

      cargarPQR();

    } catch (error) {

      console.error(error);
      alert("Error actualizando PQR");

    } finally {

      setGuardando(false);

    }

  };
  const validarFormulario = () => {

    const nuevosErrores = {};

    if (!mensaje.trim()) {

      nuevosErrores.mensaje =
        "El mensaje es obligatorio";

    } else if (mensaje.trim().length < 10) {

      nuevosErrores.mensaje =
        "El mensaje debe tener mínimo 10 caracteres";

    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!user) {

      alert("Debes iniciar sesión");
      return;

    }

    if (!validarFormulario()) return;

    else if (mensaje.trim().length > 99) {
      nuevosErrores.mensaje =
        "El mensaje no puede superar los 99 caracteres";
    }

    try {

      const res = await fetch(
        "http://localhost:3000/api/pqr",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            asunto: tipo,
            mensaje,
            usuarioId: user.id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        alert(data.error);
        return;

      }

      alert("PQR enviada correctamente");

      setMensaje("");
      setTipo("peticion");

      cargarPQR();

    } catch (error) {

      console.error(error);

      alert("Error enviando PQR");

    }

  };

  return (
    <div className="pqr-container">

      <h1>📝 PQR</h1>

      {!user && (
        <p>
          Debes iniciar sesión para crear solicitudes.
        </p>
      )}

      {user && (
        <form
          onSubmit={handleSubmit}
          className="pqr-form"
        >

          <div className="pqr-field">

            <label className="pqr-label">
              Tipo
            </label>

            <select
              value={tipo}
              onChange={(e) =>
                setTipo(e.target.value)
              }
              className="pqr-select"
            >
              <option value="peticion">
                Petición
              </option>

              <option value="queja">
                Queja
              </option>

              <option value="reclamo">
                Reclamo
              </option>

              <option value="sugerencia">
                Sugerencia
              </option>
            </select>

          </div>

          <div className="pqr-field">

            <label className="pqr-label">
              Mensaje
            </label>

            <textarea
              rows="5"
              maxLength="99"
              value={mensaje}
              onChange={(e) =>
                setMensaje(e.target.value)
              }
              className={`pqr-textarea ${
                errores.mensaje ? "pqr-input-error" : ""
              }`}
            />

            {errores.mensaje && (
              <span className="pqr-error">
                {errores.mensaje}
              </span>
            )}

          </div>

          <button
            className="pqr-button"
            onClick={() => actualizarPQR(pqr.id)}
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>

        </form>
      )}

      <div className="pqr-historial">

        <h2>
          {user?.role === "developer"
            ? "Todos los PQR"
            : "Mis PQR"}
        </h2>

        {loading ? (

  <div className="loading-container">
    <h3>Cargando PQR...</h3>
  </div>

) : pqrs.length === 0 ? (

  <p>No hay registros.</p>

) : (

  pqrs.map((pqr) => (
    <div
      key={pqr.id}
      className="pqr-card"
    >

      <h3>{pqr.asunto}</h3>

      <p>
        <strong>Estado:</strong>{" "}
        {pqr.estado}
      </p>

      <p>{pqr.mensaje}</p>

      {pqr.respuesta && (
        <div className="pqr-respuesta">
          <strong>Respuesta:</strong>
          <p>{pqr.respuesta}</p>
        </div>
      )}

      {user?.role === "developer" && (

        <div className="pqr-admin-panel">

          {pqr.usuario && (
            <p>
              <strong>Usuario:</strong>{" "}
              {pqr.usuario.name}
            </p>
          )}

          <textarea
            className="pqr-textarea"
            placeholder="Respuesta del desarrollador"
            value={
              respuestaDev[pqr.id] ??
              pqr.respuesta ??
              ""
            }
            onChange={(e) =>
              setRespuestaDev({
                ...respuestaDev,
                [pqr.id]: e.target.value,
              })
            }
          />

          <select
            className="pqr-select"
            value={
              estadoDev[pqr.id] ??
              pqr.estado
            }
            onChange={(e) =>
              setEstadoDev({
                ...estadoDev,
                [pqr.id]: e.target.value,
              })
            }
          >
            <option value="PENDIENTE">
              Pendiente
            </option>

            <option value="EN_PROCESO">
              En Proceso
            </option>

            <option value="RESPONDIDO">
              Respondido
            </option>

            <option value="RESUELTO">
              Resuelto
            </option>
          </select>

          <button
            className="pqr-button"
            onClick={() => actualizarPQR(pqr.id)}
            disabled={guardando}
          >
            {guardando
              ? "Guardando..."
              : "Guardar cambios"}
          </button>

        </div>

      )}

    </div>
  ))

)}

      </div>

    </div>
  );
}

export default PQR;