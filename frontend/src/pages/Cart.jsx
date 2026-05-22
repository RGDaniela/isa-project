import { useState } from "react"

function Cart() {
  const [carrito, setCarrito] = useState([
    {
      id: 1,
      nombre: "Camiseta ISA",
      precio: 25000,
      cantidad: 1,
    },
    {
      id: 2,
      nombre: "Gorra ISA",
      precio: 18000,
      cantidad: 2,
    },
  ])

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return
    setCarrito(
      carrito.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    )
  }

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

  const handlePago = () => {
    alert("🚀 Pasarela de pago simulada. Total a pagar: $" + total)
  }

  return (
    <>
      <div className="cart-container" style={styles.container}>
        <h1>🛒 Carrito de Compras</h1>

        {carrito.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>${item.precio}</td>
                    <td>
                      <button
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                        style={styles.btnSmall}
                      >
                        -
                      </button>
                      <span style={{ margin: "0 10px" }}>{item.cantidad}</span>
                      <button
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        style={styles.btnSmall}
                      >
                        +
                      </button>
                    </td>
                    <td>${item.precio * item.cantidad}</td>
                    <td>
                      <button
                        onClick={() => eliminarProducto(item.id)}
                        style={styles.btnEliminar}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={styles.totalContainer}>
              <h2>Total: ${total}</h2>
              <button onClick={handlePago} style={styles.btnPagar}>
                Proceder al Pago 💳
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "0 1rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  btnSmall: {
    background: "#e94560",
    color: "white",
    border: "none",
    width: "30px",
    height: "30px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  btnEliminar: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  totalContainer: {
    marginTop: "2rem",
    textAlign: "right",
    borderTop: "2px solid #ddd",
    paddingTop: "1rem",
  },
  btnPagar: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
}

export default Cart