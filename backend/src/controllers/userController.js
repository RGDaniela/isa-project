import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
export const createUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    console.log(req.body);

    // VALIDAR CAMPOS
    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        error: "Faltan campos obligatorios"
      });

    }

    // VALIDAR EMAIL
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      return res.status(400).json({
        success: false,
        error: "Correo inválido"
      });

    }

    // VALIDAR PASSWORD
    if (password.length < 6) {

      return res.status(400).json({
        success: false,
        error: "La contraseña debe tener mínimo 6 caracteres"
      });

    }

    // VALIDAR NOMBRE
    if (name.trim().length < 3) {

      return res.status(400).json({
        success: false,
        error: "El nombre debe tener mínimo 3 caracteres"
      });

    }

    // REVISAR SI YA EXISTE
    const existingUser =
      await prisma.user.findUnique({

        where: {
          email
        }

      });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        error: "El correo ya está registrado"
      });

    }

    // CREAR USUARIO
    const user = await prisma.user.create({

      data: {

        name: name.trim(),

        email: email.trim(),

        password,

        role: role || "user"

      }

    });

    res.json({
      success: true,
      message: "Usuario creado correctamente",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message

    });

  }

};

// READ ALL + FILTROS DINÁMICOS
export const getUsers = async (req, res) => {

  try {

    const {
      name,
      email,
      role
    } = req.query;

    const users = await prisma.user.findMany({

      where: {

        // BUSCAR POR NOMBRE
        ...(name && {

          name: {
            contains: name,
          },

        }),

        // BUSCAR POR EMAIL
        ...(email && {

          email: {
            contains: email,
          },

        }),

        // FILTRAR POR ROL
        ...(role && {
          role,
        }),

      },

    });

    res.json(users);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

// READ ONE
export const getUserById = async (req, res) => {

  try {

    const user = await prisma.user.findUnique({

      where: {
        id: Number(req.params.id)
      },

    });

    if (!user) {

      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado"
      });

    }

    res.json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

// UPDATE
export const updateUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    // VALIDACIONES
    if (
      name &&
      name.trim().length < 3
    ) {

      return res.status(400).json({
        success: false,
        error: "Nombre inválido"
      });

    }

    if (email) {

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {

        return res.status(400).json({
          success: false,
          error: "Correo inválido"
        });

      }

    }

    if (
      password &&
      password.length < 6
    ) {

      return res.status(400).json({
        success: false,
        error: "La contraseña debe tener mínimo 6 caracteres"
      });

    }

    const user = await prisma.user.update({

      where: {
        id: Number(req.params.id)
      },

      data: {

        ...(name && {
          name: name.trim()
        }),

        ...(email && {
          email: email.trim()
        }),

        ...(password && {
          password
        }),

        ...(role && {
          role
        }),

      }

    });

    res.json({
      success: true,
      message: "Usuario actualizado correctamente",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

// DELETE
export const deleteUser = async (req, res) => {

  try {

    await prisma.user.delete({

      where: {
        id: Number(req.params.id)
      },

    });

    res.json({

      success: true,

      message: "Usuario eliminado correctamente"

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};