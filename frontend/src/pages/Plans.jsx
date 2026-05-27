import { useEffect, useState } from "react";
import "../styles/plans.css";
import { useAuth } from "../context/AuthContext";
import { isDeveloper } from "../utils/permissions";


function Products() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [mostrarPago, setMostrarPago] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  const [mostrarCrearPlan, setMostrarCrearPlan] = useState(false);
  const [loading, setLoading] = useState(true);

const [nuevoPlan, setNuevoPlan] = useState({
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  category: "Planes"
});

  const [tarjeta, setTarjeta] = useState({
    numero: "",
    nombre: "",
    fecha: "",
    cvv: ""
  });

  const { user } = useAuth();
  const isDev = isDeveloper(user);

  const validarPlan = () => {

    if (!nuevoPlan.name.trim()) {
      alert("El nombre es obligatorio");
      return false;
    }

    if (nuevoPlan.name.trim().length < 3) {
      alert("El nombre debe tener mínimo 3 caracteres");
      return false;
    }

    if (!nuevoPlan.description.trim()) {
      alert("La descripción es obligatoria");
      return false;
    }

    if (nuevoPlan.description.trim().length < 10) {
      alert("La descripción es demasiado corta");
      return false;
    }

    if (!nuevoPlan.price || Number(nuevoPlan.price) <= 0) {
      alert("Precio inválido");
      return false;
    }

    if (
      nuevoPlan.imageUrl &&
      !/^https?:\/\/.+/i.test(nuevoPlan.imageUrl)
    ) {
      alert("La URL de imagen no es válida");
      return false;
    }

    return true;
  };

  // =========================
  // CARGAR PLANES
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {

      try {

        setLoading(true);

        let url = "http://localhost:3000/api/products?";

        if (searchTerm) {
          url += `name=${searchTerm}&`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setProductos(Array.isArray(data) ? data : []);

      } catch (error) {

        console.error("Error cargando planes:", error);
        setProductos([]);

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, [searchTerm]);
  // =========================
  // SELECCIONAR PLAN
  // =========================
  const seleccionarPlan = (producto) => {
    setPlanSeleccionado(producto);
    setMostrarPago(true);
  };

  // =========================
  // FORMATO TARJETA (UX)
  // =========================
  const formatearNumero = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatearFecha = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{0,2})/, (_, m, a) =>
        a ? `${m}/${a}` : m
      );
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleTarjetaChange = (e) => {
    const { name, value } = e.target;

    let nuevoValor = value;

    if (name === "numero") {
      nuevoValor = formatearNumero(value);
    }

    if (name === "fecha") {
      nuevoValor = formatearFecha(value);
    }

    setTarjeta({
      ...tarjeta,
      [name]: nuevoValor
    });
  };

  // =========================
  // VALIDACIÓN + PAGO
  // =========================
  const procesarPago = () => {
    
    const numero = tarjeta.numero.replace(/\s/g, "");

    const regexNumero = /^\d{12,19}$/;
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const regexFecha = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const regexCvv = /^\d{3,4}$/;

    if (!numero || !tarjeta.nombre || !tarjeta.fecha || !tarjeta.cvv) {
      alert("Completa todos los datos de la tarjeta");
      return;
    }

    if (!regexNumero.test(numero)) {
      alert("Número inválido (12-19 dígitos)");
      return;
    }

    if (!regexNombre.test(tarjeta.nombre.trim())) {
      alert("Nombre inválido (solo letras)");
      return;
    }

    if (!regexFecha.test(tarjeta.fecha)) {
      alert("Fecha inválida (MM/AA)");
      return;
    }

    if (!regexCvv.test(tarjeta.cvv)) {
      alert("CVV inválido (3-4 dígitos)");
      return;
    }

    const suscription = {
      id: planSeleccionado.id,
      nombre: planSeleccionado.name,
      precio: planSeleccionado.price,
      fechaInicio: new Date().toISOString(),
      estado: "Activa"
    };

    localStorage.setItem("suscription", JSON.stringify(suscription));

    alert(
      `💳 Pago exitoso\n\nPlan: ${planSeleccionado.name}\nPrecio: $${planSeleccionado.price}`
    );

    setMostrarPago(false);
    setPlanSeleccionado(null);

    setTarjeta({
      numero: "",
      nombre: "",
      fecha: "",
      cvv: ""
    });
  };


  // =========================
// CREAR PLAN
// =========================
const crearPlan = async () => {
    if (!validarPlan()) return;

    try {
      const res = await fetch(
        "http://localhost:3000/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(nuevoPlan)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("Plan creado correctamente");

      setProductos([...productos, data]);

      setMostrarCrearPlan(false);

      setNuevoPlan({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "Planes"
      });

    } catch (error) {
      console.error(error);
      alert("Error creando plan");
    }
  };

  // =========================
  // ELIMINAR PLAN
  // =========================
  const eliminarPlan = async (id) => {

    if (!window.confirm("¿Eliminar este plan?")) {
      return;
    }

    try {

      const res = await fetch(
        `http://localhost:3000/api/products/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!res.ok) {
        alert("Error eliminando plan");
        return;
      }

      setProductos(
        productos.filter((p) => p.id !== id)
      );

    } catch (error) {

      console.error(error);

    }
  };
  // =========================
  // UI
  // =========================
  return (
    <div className="products-container">

      <h1>Nuestros Planes</h1>

      <input
        type="text"
        placeholder="Buscar planes..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ADMIN */}
      {isDev && (
        <div className="admin-panel">
          <h2>Panel de Administración</h2>
          <button
            onClick={() => setMostrarCrearPlan(true)}
          >
            + Crear Plan
          </button>
        </div>
      )}

      {/* PLANES */}
      {loading ? (

    <div className="loading-container">
      <h3>Cargando planes...</h3>
    </div>

  ) : (

    <div className="products-grid">

      {productos.map((producto) => (
          <div key={producto.id} className="product-card">

            <img
              src={producto.imageUrl || "https://via.placeholder.com/150"}
              alt={producto.name}
            />

            <h3>{producto.name}</h3>
            <p className="price">${producto.price} / mes</p>
            <p className="product-description">
              {producto.description}
            </p>
            <p className="suscription-tag">Suscripción mensual</p>

            <div className="product-actions">

            <button onClick={() => seleccionarPlan(producto)}>
              Activar Suscripción
            </button>

            {isDev && (
              <button
                className="delete-btn"
                onClick={() => eliminarPlan(producto.id)}
              >
                Eliminar
              </button>
            )}

          </div>

          </div>
        ))}
      </div>

    )}

      
      {mostrarCrearPlan && (
        <div className="payment-modal">
          <div className="payment-box">

            <h2>Crear Plan</h2>

            <input
              placeholder="Nombre"
              value={nuevoPlan.name}
              onChange={(e) =>
                setNuevoPlan({
                  ...nuevoPlan,
                  name: e.target.value
                })
              }
            />

            <textarea
              placeholder="Descripción"
              value={nuevoPlan.description}
              onChange={(e) =>
                setNuevoPlan({
                  ...nuevoPlan,
                  description: e.target.value
                })
              }
            />

            <input
              type="number"
              placeholder="Precio"
              value={nuevoPlan.price}
              onChange={(e) =>
                setNuevoPlan({
                  ...nuevoPlan,
                  price: e.target.value
                })
              }
            />

            <input
              placeholder="URL Imagen"
              value={nuevoPlan.imageUrl}
              onChange={(e) =>
                setNuevoPlan({
                  ...nuevoPlan,
                  imageUrl: e.target.value
                })
              }
            />

            <button onClick={crearPlan}>
              Guardar Plan
            </button>

            <button
              onClick={() => setMostrarCrearPlan(false)}
            >
              Cancelar
            </button>

          </div>
        </div>
      )}
      {/* PAGO */}
      {mostrarPago && planSeleccionado && (
        <div className="payment-modal">
          <div className="payment-box">

            <h2>Pago con tarjeta</h2>

            <p>
              Plan: <b>{planSeleccionado.name}</b>
            </p>

            <p>
              Total: <b>${planSeleccionado.price}</b>
            </p>

            <input
              name="numero"
              placeholder="Número de tarjeta"
              value={tarjeta.numero}
              onChange={handleTarjetaChange}
              maxLength={23}
            />

            <input
              name="nombre"
              placeholder="Nombre del titular"
              value={tarjeta.nombre}
              onChange={handleTarjetaChange}
            />

            <input
              name="fecha"
              placeholder="MM/AA"
              value={tarjeta.fecha}
              onChange={handleTarjetaChange}
              maxLength={5}
            />

            <input
              name="cvv"
              placeholder="CVV"
              value={tarjeta.cvv}
              onChange={handleTarjetaChange}
              maxLength={4}
            />

            <button onClick={procesarPago}>
              Confirmar Pago
            </button>

            <button
              onClick={() => {
                setMostrarPago(false);
                setPlanSeleccionado(null);
              }}
            >
              Cancelar
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Products;