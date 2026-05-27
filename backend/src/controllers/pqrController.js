import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* =========================
   CREAR PQR
========================= */
export const crearPQR = async (req, res) => {

  try {

    const {
      asunto,
      mensaje,
      usuarioId
    } = req.body;

    if (
      !asunto ||
      !mensaje ||
      !usuarioId
    ) {

      return res.status(400).json({
        error: "Todos los campos son obligatorios"
      });

    }

    const nuevoPQR = await prisma.pQR.create({

      data: {

        asunto,
        mensaje,

        estado: "PENDIENTE",

        usuarioId: Number(usuarioId)

      }

    });

    res.status(201).json(nuevoPQR);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error creando PQR"
    });

  }

};

/* =========================
   OBTENER MIS PQR
========================= */
export const obtenerMisPQR = async (req, res) => {

  try {

    const { userId } = req.params;

    const pqrs = await prisma.pQR.findMany({

      where: {
        usuarioId: Number(userId)
      },

      orderBy: {
        createdAt: "desc"
      }

    });

    res.json(pqrs);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error obteniendo PQR"
    });

  }

};

/* =========================
   OBTENER TODOS LOS PQR
========================= */
export const obtenerTodosPQR = async (req, res) => {

  try {

    const pqrs = await prisma.pQR.findMany({

      include: {
        usuario: true
      },

      orderBy: {
        createdAt: "desc"
      }

    });

    res.json(pqrs);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error obteniendo PQR"
    });

  }

};

/* =========================
   RESPONDER PQR
========================= */
export const responderPQR = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      respuesta,
      estado
    } = req.body;

    const pqrActualizado =
      await prisma.pQR.update({

        where: {
          id: Number(id)
        },

        data: {
          respuesta,
          estado
        }

      });

    res.json(pqrActualizado);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error actualizando PQR"
    });

  }

};

/* =========================
   ELIMINAR PQR
========================= */
export const eliminarPQR = async (req, res) => {

  try {

    const { id } = req.params;

    await prisma.pQR.delete({

      where: {
        id: Number(id)
      }

    });

    res.json({
      message: "PQR eliminado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error eliminando PQR"
    });

  }

};