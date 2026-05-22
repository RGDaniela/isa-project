function Dashboard() {
  const users = [
    {
      id: 1,
      name: "Dayanne Daniela Rodriguez Gonzalez",
      email: "dayanned-rodriguezg@unilibre.edu.co",
    },

    {
      id: 2,
      name: "Dylan Vargas Mendieta",
      email: "Dylan@unilibre.edu.co",
    },

   
  ]

  return (
    <div>
      <div style={styles.container}>
        <h1>Dashboard Admin 🚀</h1>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: "40px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "white",
  },
}

export default Dashboard