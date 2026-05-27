import express from "express";
import cors from "cors";


import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pqrRoutes from "./routes/pqrRoutes.js";
import developerRoutes from "./routes/developerRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Ruta prueba
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// Rutas API
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pqr", pqrRoutes);
app.use("/api/developers", developerRoutes);


// Middleware de errores (SIEMPRE al final)
app.use(errorMiddleware);

export default app;