import Navbar from "../components/Navbar"

function Privacy() {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "2rem" }}>
        <h1>📋 Manejo de Datos Personales</h1>
        
        <p>En <strong>ISA Project</strong> nos comprometemos a proteger tu información personal. De acuerdo con la ley de protección de datos:</p>
        
        <ul style={{ marginTop: "1rem", lineHeight: "1.8" }}>
          <li>✅ Tus datos serán usados solo para fines comerciales y de servicio.</li>
          <li>✅ No compartiremos tu información con terceros sin tu consentimiento.</li>
          <li>✅ Puedes solicitar la corrección o eliminación de tus datos en cualquier momento.</li>
          <li>✅ Implementamos medidas de seguridad para proteger tu información.</li>
          <li>✅ Los datos serán conservados durante el tiempo necesario para cumplir con los fines comerciales.</li>
        </ul>
        
        <h3 style={{ marginTop: "2rem" }}>Tus derechos:</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>🔹 Conocer tus datos personales que tenemos.</li>
          <li>🔹 Actualizar o corregir tus datos.</li>
          <li>🔹 Solicitar la eliminación de tus datos.</li>
          <li>🔹 Revocar tu consentimiento en cualquier momento.</li>
        </ul>
        
        <p style={{ marginTop: "2rem", color: "#666" }}>
          <strong>Fecha de vigencia:</strong> Mayo 2026
        </p>
      </div>
    </>
  )
}

export default Privacy