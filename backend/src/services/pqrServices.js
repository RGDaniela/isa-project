import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* =========================
   CREAR PQR
========================= */
export const crearPQRService = async ({
  asunto,
  descripcion,
  userId
}) => {

  return await prisma.pQR.create({

    data: {

      asunto,
      descripcion,

      estado: "Pendiente",

      userId: Number(userId)

    }

  });

};

/* =========================
   OBTENER PQR DE USUARIO
========================= */
export const obtenerMisPQRService = async (userId) => {

  return await prisma.pQR.findMany({

    where: {
      userId: Number(userId)
    },

    orderBy: {
      createdAt: "desc"
    }

  });

};

/* =========================
   OBTENER TODOS LOS PQR
========================= */
export const obtenerTodosPQRService = async () => {

  return await prisma.pQR.findMany({

    include: {
      user: true
    },

    orderBy: {
      createdAt: "desc"
    }

  });

};

/* =========================
   RESPONDER / ACTUALIZAR PQR
========================= */
export const responderPQRService = async (
  id,
  {
    respuesta,
    estado
  }
) => {

  return await prisma.pQR.update({

    where: {
      id: Number(id)
    },

    data: {

      respuesta,
      estado

    }

  });

};

/* =========================
   ELIMINAR PQR
========================= */
export const eliminarPQRService = async (id) => {

  return await prisma.pQR.delete({

    where: {
      id: Number(id)
    }

  });

};