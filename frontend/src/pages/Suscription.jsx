import { useState, useEffect } from "react";

function Suscription() {

  const [plan, setPlan] = useState(null);
  const [facturas, setFacturas] = useState([]);
  const [mostrarPago, setMostrarPago] = useState(false);

  const [errores, setErrores] = useState({});

  const [tarjeta, setTarjeta] = useState({
    numero: "",
    nombre: "",
    fecha: "",
    cvv: ""
  });

  // =========================
  // CARGAR PLAN
  // =========================
  useEffect(() => {

    const savedPlan = localStorage.getItem("suscription");

    if (!savedPlan) return;

    try {

      const parsedPlan = JSON.parse(savedPlan);
      setPlan(parsedPlan);

      const hoy = new Date();

      const facturaActual = {
        id: 1,
        fecha: hoy.toLocaleDateString("es-CO", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }),
        valor: parsedPlan.price,
        estado: "Pagada"
      };

      const anterior = new Date();
      anterior.setMonth(anterior.getMonth() - 1);

      const facturaAnterior = {
        id: 2,
        fecha: anterior.toLocaleDateString("es-CO", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }),
        valor: parsedPlan.price,
        estado: "Pagada"
      };

      setFacturas([facturaActual, facturaAnterior]);

    } catch (error) {
      console.error(error);
    }

  }, []);

  // =========================
  // VALIDACIÓN REGEX
  // =========================
  const validarTarjeta = () => {

    const nuevosErrores = {};

    const regexNumero = /^\d{12,19}$/;
    const regexNombre = /^[a-zA-Z\s]{3,50}$/;
    const regexFecha = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const regexCVV = /^\d{3,4}$/;

    if (!regexNumero.test(tarjeta.numero)) {
      nuevosErrores.numero = "Número inválido (12-19 dígitos)";
    }

    if (!regexNombre.test(tarjeta.nombre)) {
      nuevosErrores.nombre = "Nombre inválido (solo letras)";
    }

    if (!regexFecha.test(tarjeta.fecha)) {
      nuevosErrores.fecha = "Fecha inválida (MM/AA)";
    }

    if (!regexCVV.test(tarjeta.cvv)) {
      nuevosErrores.cvv = "CVV inválido (3-4 dígitos)";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  // =========================
  // PAGO
  // =========================
  const handlePago = () => {

    if (!plan) return;

    if (!validarTarjeta()) return;

    alert(
      `💳 Pago simulado OK\nPlan: ${plan.name}\nValor: $${plan.price}`
    );

    const nuevaFactura = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString("es-CO", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }),
      valor: plan.price,
      estado: "Pagada"
    };

    setFacturas(prev => [nuevaFactura, ...prev]);

    setMostrarPago(false);

    setTarjeta({
      numero: "",
      nombre: "",
      fecha: "",
      cvv: ""
    });

    setErrores({});
  };

  // =========================
  // SIN PLAN
  // =========================
  if (!plan) {
    return (
      <div style={styles.container}>
        <h1>📄 Mi Suscripción</h1>
        <div style={styles.planCard}>
          <h2>No tienes una suscripción activa</h2>
        </div>
      </div>
    );
  }

  const fechaRenovacion = new Date();
  fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 1);

  return (
    <div style={styles.container}>

      <h1>📄 Mi Suscripción</h1>

      <div style={styles.planCard}>

        <h2>{plan.name || plan.nombre}</h2>

        <p>
          <strong>Estado:</strong> <span style={styles.activeStatus}>Activa</span>
        </p>

        <p>
          <strong>Precio:</strong> ${plan.price || plan.precio}
        </p>

        <p>
          <strong>Renovación:</strong>{" "}
          {fechaRenovacion.toLocaleDateString("es-CO", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </p>

        <button onClick={() => setMostrarPago(true)} style={styles.btnPagar}>
          Renovar
        </button>

        {/* ========================= */}
        {/* PAGO */}
        {/* ========================= */}
        {mostrarPago && (
          <div style={styles.paymentBox}>

            <input
              placeholder="Número de tarjeta"
              value={tarjeta.numero}
              onChange={(e) =>
                setTarjeta({ ...tarjeta, numero: e.target.value })
              }
              style={styles.input}
            />
            {errores.numero && <p style={styles.error}>{errores.numero}</p>}

            <input
              placeholder="Nombre titular"
              value={tarjeta.nombre}
              onChange={(e) =>
                setTarjeta({ ...tarjeta, nombre: e.target.value })
              }
              style={styles.input}
            />
            {errores.nombre && <p style={styles.error}>{errores.nombre}</p>}

            <input
              placeholder="MM/AA"
              value={tarjeta.fecha}
              onChange={(e) =>
                setTarjeta({ ...tarjeta, fecha: e.target.value })
              }
              style={styles.input}
            />
            {errores.fecha && <p style={styles.error}>{errores.fecha}</p>}

            <input
              placeholder="CVV"
              value={tarjeta.cvv}
              onChange={(e) =>
                setTarjeta({ ...tarjeta, cvv: e.target.value })
              }
              style={styles.input}
            />
            {errores.cvv && <p style={styles.error}>{errores.cvv}</p>}

            <button onClick={handlePago} style={styles.btnConfirmar}>
              Pagar
            </button>

          </div>
        )}

      </div>

      {/* FACTURAS */}
      <div style={styles.invoiceContainer}>
        <h2>🧾 Facturación</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Valor</th>
              <th style={styles.th}>Estado</th>
            </tr>
          </thead>

          <tbody>
            {facturas.map(f => (
              <tr key={f.id}>
                <td style={styles.td}>{f.fecha}</td>
                <td style={styles.td}>${f.valor}</td>
                <td style={styles.td}>
                  <span style={styles.paidStatus}>{f.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Suscription;

const styles = {

  container: {
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "0 1rem",
  },

  planCard: {
    background: "white",
    color: "#1f2937",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },

  activeStatus: {
    color: "#28a745",
    fontWeight: "bold",
  },

  paidStatus: {
    color: "#28a745",
    fontWeight: "bold",
  },

  invoiceContainer: {
    marginTop: "40px",
    color: "#1f2937",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "white",
    color: "#1f2937",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  th: {
    padding: "14px",
    background: "linear-gradient(90deg, #7b25eb, #a054df)",
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
    color: "#1f2937",
  },

  btnPagar: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
    marginRight: "10px",
  },

  btnCancelar: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  },

  paymentBox: {
    marginTop: "25px",
    padding: "20px",
    background: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
  },

  btnConfirmar: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
  }

};