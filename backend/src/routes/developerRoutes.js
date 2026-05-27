import express from "express";

import {
  crearDeveloper,
  obtenerDevelopers,
  obtenerDeveloperPorId,
  actualizarDeveloper,
  eliminarDeveloper
} from "../controllers/developerController.js";

const router = express.Router();

/* =========================
   CREAR PERFIL
========================= */
router.post("/", crearDeveloper);

/* =========================
   OBTENER TODOS
========================= */
router.get("/", obtenerDevelopers);

/* =========================
   OBTENER UNO
========================= */
router.get("/:id", obtenerDeveloperPorId);

/* =========================
   ACTUALIZAR
========================= */
router.put("/:id", actualizarDeveloper);

/* =========================
   ELIMINAR
========================= */
router.delete("/:id", eliminarDeveloper);

export default router;