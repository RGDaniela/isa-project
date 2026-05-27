import { useEffect, useState } from "react";
import "../styles/users.css";

function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        setLoading(true);

        const res = await fetch(
          "http://localhost:3000/api/users"
        );

        const data = await res.json();

        console.log(data);

        setUsers(data);

      } catch (error) {

        console.error(error);
        setUsers([]);

      } finally {

        setLoading(false);

      }

    };

    fetchUsers();

  }, []);

  return (
    <div className="users-container">

      <h1>Usuarios</h1>

      {loading ? (

        <div className="loading-container">
          <h3>Cargando usuarios...</h3>
        </div>

      ) : users.length === 0 ? (

        <div className="empty-state">
          No hay usuarios
        </div>

      ) : (

        users.map((user) => (
          <div
            key={user.id}
            className="user-card"
          >

            <p>
              <strong>Nombre:</strong>{" "}
              {user.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>

            <p>
              <strong>Rol:</strong>{" "}
              {user.role}
            </p>

          </div>
        ))

      )}

    </div>
  );
}

export default Users;