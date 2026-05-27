import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* =========================
   OBTENER TODOS
========================= */
export const obtenerDevelopers = async (req, res) => {

  try {

    const developers =
      await prisma.developerProfile.findMany({

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }

      });

    res.json(developers);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error obteniendo desarrolladores"
    });

  }

};

/* =========================
   OBTENER UNO
========================= */
export const obtenerDeveloperPorId = async (req, res) => {

  try {

    const { id } = req.params;

    const developer =
      await prisma.developerProfile.findUnique({

        where: {
          id: Number(id)
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }

      });

    if (!developer) {

      return res.status(404).json({
        error: "Desarrollador no encontrado"
      });

    }

    res.json(developer);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error obteniendo desarrollador"
    });

  }

};

/* =========================
   CREAR
========================= */
export const crearDeveloper = async (req, res) => {

  try {

    const {
      phone,
      photoUrl,
      bio,
      githubUrl,
      linkedinUrl,
      userId
    } = req.body;

    if (!phone || !userId) {

      return res.status(400).json({
        error: "phone y userId son obligatorios"
      });

    }

    const nuevoDeveloper =
      await prisma.developerProfile.create({

        data: {

          phone,
          photoUrl,
          bio,
          githubUrl,
          linkedinUrl,
          userId: Number(userId)

        }

      });

    res.status(201).json(nuevoDeveloper);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error creando desarrollador"
    });

  }

};

/* =========================
   ACTUALIZAR
========================= */
export const actualizarDeveloper = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      phone,
      photoUrl,
      bio,
      githubUrl,
      linkedinUrl
    } = req.body;

    const developer =
      await prisma.developerProfile.update({

        where: {
          id: Number(id)
        },

        data: {

          phone,
          photoUrl,
          bio,
          githubUrl,
          linkedinUrl

        }

      });

    res.json(developer);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error actualizando desarrollador"
    });

  }

};

/* =========================
   ELIMINAR
========================= */
export const eliminarDeveloper = async (req, res) => {

  try {

    const { id } = req.params;

    await prisma.developerProfile.delete({

      where: {
        id: Number(id)
      }

    });

    res.json({
      message: "Desarrollador eliminado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error eliminando desarrollador"
    });

  }

};