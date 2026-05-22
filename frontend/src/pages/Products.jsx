import { useEffect, useState } from "react";
import "../styles/products.css";
import { useAuth } from "../context/AuthContext";
import { isDeveloper } from "../utils/permissions";

function Products() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const isDev = isDeveloper(user);

  // 🔵 CARGAR PRODUCTOS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProducts();
  }, []);

  // 🛒 CARRITO
  const agregarAlCarrito = (producto) => {
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // 🗑 ELIMINAR PRODUCTO (DEV)
  const eliminarProducto = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      setProductos(productos.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  // ✏ EDITAR PRODUCTO (DEV SIMPLE)
  const editarProducto = async (producto) => {
    const nuevoNombre = prompt("Nuevo nombre:", producto.name);
    const nuevoPrecio = prompt("Nuevo precio:", producto.price);

    if (!nuevoNombre || !nuevoPrecio) return;

    try {
      await fetch(`http://localhost:3000/api/products/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nuevoNombre,
          price: Number(nuevoPrecio),
        }),
      });

      setProductos(prev =>
        prev.map(p =>
          p.id === producto.id
            ? { ...p, name: nuevoNombre, price: Number(nuevoPrecio) }
            : p
        )
      );
    } catch (error) {
      console.error("Error editando producto:", error);
    }
  };

  // ➕ CREAR PRODUCTO (DEV SIMPLE)
  const crearProducto = async () => {
    const name = prompt("Nombre:");
    const description = prompt("Descripción:");
    const price = prompt("Precio:");
    const stock = prompt("Stock:");
    const category = prompt("Categoría:");
    const imageUrl = prompt("Imagen URL:");

    if (!name || !description || !price || !stock || !category) return;

    try {
      await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          category,
          imageUrl
        }),
      });

      // refrescar datos reales
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      setProductos(data);

    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  // 🔍 FILTRO
  const productosFiltrados = productos.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <h1>Nuestros Productos</h1>

      <input
        type="text"
        placeholder="Buscar productos..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🔵 PANEL ADMIN */}
      {isDev && (
        <div className="admin-panel">
          <h2>Panel de Administración</h2>
          <button onClick={crearProducto}>+ Crear producto</button>
        </div>
      )}

      {/* 🟢 PRODUCTOS */}
      <div className="products-grid">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="product-card">

            <img
              src={producto.imageUrl || "https://via.placeholder.com/150"}
              alt={producto.name}
            />

            <h3>{producto.name}</h3>
            <p>${producto.price}</p>
            <p>Stock: {producto.stock}</p>

            <button onClick={() => agregarAlCarrito(producto)}>
              Agregar al Carrito
            </button>

            {/* 🔥 DEV ACTIONS */}
            {isDev && (
              <div className="admin-actions">
                <button onClick={() => editarProducto(producto)}>
                  Editar
                </button>

                <button onClick={() => eliminarProducto(producto.id)}>
                  Eliminar
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* 🟡 CARRITO */}
      <div className="cart-summary">
        <h2>Carrito de Compras</h2>

        {carrito.length === 0 ? (
          <p>Carrito vacío</p>
        ) : (
          <>
            {carrito.map(item => (
              <div key={item.id}>
                {item.name} - ${item.price} x {item.cantidad} =
                ${item.price * item.cantidad}
              </div>
            ))}

            <h3>
              Total: $
              {carrito.reduce(
                (sum, item) => sum + item.price * item.cantidad,
                0
              )}
            </h3>

            <button className="checkout-btn">
              Proceder al Pago (Simulado)
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Products;