function Card({ title, text }) {
  return (
    <div style={styles.card}>
      <h2>{title}</h2>

      <p>{text}</p>

      <button style={styles.button}>
        Ver más
      </button>
    </div>
  )
}

const styles = {
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "250px",
  },

  button: {
    marginTop: "15px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
}

export default Card