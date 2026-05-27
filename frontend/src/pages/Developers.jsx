import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/developers.css";

function Developers() {
  const { user } = useAuth();
  const isDev = user?.role === "developer";

  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nombre: "",
    photoUrl: "",
    celular: "",
    email: "",
    perfil: "",
    githubUrl: "",
    linkedinUrl: "",
    userId: ""
  });

  const [editando, setEditando] = useState(null);

  const cargarDevelopers = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        "http://localhost:3000/api/developers"
      );

      const data = await res.json();

      setDevelopers(data);

    } catch (error) {

      console.error(error);
      setDevelopers([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    cargarDevelopers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId || !formData.celular) {
      alert("UserId y celular son obligatorios");
      return;
    }

    const payload = {
      phone: formData.celular,
      photoUrl: formData.photoUrl || null,
      bio: formData.perfil || null,
      githubUrl: formData.githubUrl || null,
      linkedinUrl: formData.linkedinUrl || null,
      userId: Number(formData.userId),
    };

    try {
      let res;

      if (editando) {
        res = await fetch(`http://localhost:3000/api/developers/${editando}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("http://localhost:3000/api/developers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Error");
        return;
      }

      await cargarDevelopers();

      setFormData({
        nombre: "",
        photoUrl: "",
        celular: "",
        email: "",
        perfil: "",
        githubUrl: "",
        linkedinUrl: "",
        userId: ""
      });

      setEditando(null);

    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (dev) => {
    setEditando(dev.id);

    setFormData({
      nombre: dev.user?.name || "",
      photoUrl: dev.photoUrl || "",
      celular: dev.phone || "",
      email: dev.user?.email || "",
      perfil: dev.bio || "",
      githubUrl: dev.githubUrl || "",
      linkedinUrl: dev.linkedinUrl || "",
      userId: dev.userId
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar developer?")) return;

    await fetch(`http://localhost:3000/api/developers/${id}`, {
      method: "DELETE",
    });

    cargarDevelopers();
  };

  return (
    <div className="developers-container">

      <h1>👩‍💻 Equipo de Desarrollo</h1>

      {isDev && (
        <form onSubmit={handleSubmit} className="dev-form">

          <input
            type="text"
            placeholder="User ID (obligatorio)"
            value={formData.userId}
            onChange={(e) =>
              setFormData({ ...formData, userId: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Celular"
            value={formData.celular}
            onChange={(e) =>
              setFormData({ ...formData, celular: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="URL de foto"
            value={formData.photoUrl}
            onChange={(e) =>
              setFormData({ ...formData, photoUrl: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Bio"
            value={formData.perfil}
            onChange={(e) =>
              setFormData({ ...formData, perfil: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="GitHub (opcional)"
            value={formData.githubUrl}
            onChange={(e) =>
              setFormData({ ...formData, githubUrl: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="LinkedIn (opcional)"
            value={formData.linkedinUrl}
            onChange={(e) =>
              setFormData({ ...formData, linkedinUrl: e.target.value })
            }
          />

          <button type="submit">
            {editando ? "Actualizar" : "Crear"}
          </button>

        </form>
      )}

      <div className="developers-grid">

        {loading ? (

  <div className="loading-container">
    <h3>Cargando desarrolladores...</h3>
  </div>

) : (

  developers.map((dev) => (
      <div key={dev.id} className="dev-card">

        <img
          src={dev.photoUrl || "https://via.placeholder.com/150"}
          alt="dev"
        />

        <h3>{dev.user?.name}</h3>
        <p>{dev.user?.email}</p>
        <p>{dev.phone}</p>
        <p>{dev.bio}</p>

        <div className="dev-links">

          <div className="dev-socials">

            {dev.githubUrl && (
              <a
                href={dev.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="dev-social-btn github"
              >
                GitHub
              </a>
            )}

            {dev.linkedinUrl && (
              <a
                href={dev.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="dev-social-btn linkedin"
              >
                LinkedIn
              </a>
            )}

          </div>

        </div>

        {isDev && (
          <div className="dev-actions">

            <button onClick={() => handleEdit(dev)}>
              Editar
            </button>

            <button onClick={() => handleDelete(dev.id)}>
              Eliminar
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

export default Developers;