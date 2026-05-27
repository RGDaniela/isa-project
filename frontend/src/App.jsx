import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import { isDeveloper } from "./utils/permissions";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Suscription from "./pages/Suscription";
import Developers from "./pages/Developers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import PQR from "./pages/PQR";
import Privacy from "./pages/Privacy";
import Art from "./pages/Art";
import Users from "./pages/Users";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/suscription" element={<Suscription />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/about" element={<About />} />
        <Route path="/pqr" element={<PQR />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/art" element={<Art />} />

        {/* 🔒 SOLO DEV */}
        <Route
          path="/dashboard"
          element={
            isDeveloper(user)
              ? <Dashboard />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/users"
          element={
            isDeveloper(user)
              ? <Users />
              : <Navigate to="/" />
          }
        />

      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

