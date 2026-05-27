import express from "express";

import {

  crearPQR,
  obtenerMisPQR,
  obtenerTodosPQR,
  responderPQR,
  eliminarPQR

} from "../controllers/pqrController.js";

const router = express.Router();

/* =========================
   CREAR PQR
========================= */
router.post("/", crearPQR);

/* =========================
   OBTENER PQR DE UN USUARIO
========================= */
router.get("/user/:userId", obtenerMisPQR);

/* =========================
   OBTENER TODOS LOS PQR
   (DEVELOPER)
========================= */
router.get("/", obtenerTodosPQR);

/* =========================
   RESPONDER / ACTUALIZAR PQR
========================= */
router.put("/:id", responderPQR);

/* =========================
   ELIMINAR PQR
========================= */
router.delete("/:id", eliminarPQR);

export default router;