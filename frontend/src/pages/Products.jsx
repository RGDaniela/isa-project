import { useState } from "react"
import Navbar from "../components/Navbar"
import "../styles/products.css"

const productosIniciales = [
  { id: 1, nombre: "Camiseta ISA", precio: 25000, stock: 10, imagen: "/src/assets/camiseta.jpg" },
  { id: 2, nombre: "Gorra ISA", precio: 18000, stock: 15, imagen: "/src/assets/gorra.jpg" },
  { id: 3, nombre: "Taza ISA", precio: 12000, stock: 20, imagen: "/src/assets/taza.jpg" },
  { id: 4, nombre: "Cuaderno ISA", precio: 15000, stock: 8, imagen: "/src/assets/cuaderno.jpg" },
]

function Products() {
  const [productos, setProductos] = useState(productosIniciales)
  const [carrito, setCarrito] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const agregarAlCarrito = (producto) => {
    const existente = carrito.find(item => item.id === producto.id)
    if (existente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ))
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
  }

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Navbar />
      <div className="products-container">
        <h1>Nuestros Productos</h1>
        
        <input
          type="text"
          placeholder="Buscar productos..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="products-grid">
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="product-card">
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
              <p>Stock: {producto.stock}</p>
              <button onClick={() => agregarAlCarrito(producto)}>
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>

        {/* Resumen del carrito */}
        <div className="cart-summary">
          <h2>Carrito de Compras</h2>
          {carrito.length === 0 ? (
            <p>Carrito vacío</p>
          ) : (
            <>
              {carrito.map(item => (
                <div key={item.id}>
                  {item.nombre} - ${item.precio} x {item.cantidad} = ${item.precio * item.cantidad}
                </div>
              ))}
              <h3>Total: ${carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)}</h3>
              <button className="checkout-btn">Proceder al Pago (Simulado)</button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Products