import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios"
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        error: "El correo ya está registrado"
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "user"
      }
    });

    return res.status(201).json({
      message: "Usuario creado correctamente",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message
    });
  }
};

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // VALIDAR CAMPOS
    if (!email || !password) {
      return res.status(400).json({
        error: "Email y password requeridos"
      });
    }

    // BUSCAR USUARIO
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // VALIDAR USUARIO
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    // VALIDAR PASSWORD
    if (user.password !== password) {
      return res.status(401).json({
        error: "Password incorrecto"
      });
    }

    // RESPUESTA
    res.json({
      message: "Login exitoso",

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};