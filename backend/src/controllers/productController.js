import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
export const createProduct = async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      imageUrl,
      category
    } = req.body;

    console.log(req.body);

    // CAMPOS OBLIGATORIOS
    
    if (
      !name ||
      !description ||
      price == null ||
      !category
    ) {
      return res.status(400).json({
        error: "Faltan campos obligatorios"
      });
    }

    // VALIDACIONES
    if (name.trim().length < 3) {
      return res.status(400).json({
        error: "El nombre debe tener mínimo 3 caracteres"
      });
    }

    if (description.trim().length < 5) {
      return res.status(400).json({
        error: "La descripción es demasiado corta"
      });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({
        error: "El precio debe ser mayor a 0"
      });
    }


    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        imageUrl: imageUrl || null,
        category
      }
    });

    res.json(product);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// READ ALL + FILTROS DINÁMICOS
export const getProducts = async (req, res) => {

  try {

    const {
      name,
      category,
      minPrice,
      maxPrice
    } = req.query;

    const products = await prisma.product.findMany({

      where: {

        // BUSCAR POR NOMBRE
        ...(name && {
          name: {
            contains: name,
          },
        }),

        // FILTRAR CATEGORÍA
        ...(category && {
          category: category,
        }),

        // FILTRAR PRECIOS
        ...((minPrice || maxPrice) && {
          price: {

            ...(minPrice && {
              gte: Number(minPrice),
            }),

            ...(maxPrice && {
              lte: Number(maxPrice),
            }),

          },
        }),

      },

    });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

// READ ONE
export const getProductById = async (req, res) => {

  try {

    const product = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id)
      },
    });

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado"
      });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

// UPDATE
export const updateProduct = async (req, res) => {

  try {

    const {
      name,
      description,
      price,
      imageUrl,
      category,
      isActive
    } = req.body;

    // VALIDACIONES
    if (name && name.trim().length < 3) {
      return res.status(400).json({
        error: "El nombre debe tener mínimo 3 caracteres"
      });
    }

    if (description && description.trim().length < 5) {
      return res.status(400).json({
        error: "La descripción es demasiado corta"
      });
    }

    if (price != null && Number(price) <= 0) {
      return res.status(400).json({
        error: "El precio debe ser mayor a 0"
      });
    }

    const product = await prisma.product.update({

      where: {
        id: Number(req.params.id)
      },

      data: {

        ...(name && { name }),

        ...(description && { description }),

        ...(price != null && {
          price: Number(price)
        }),


        ...(imageUrl !== undefined && {
          imageUrl
        }),

        ...(category && {
          category
        }),

        ...(isActive !== undefined && {
          isActive
        }),

      }

    });

    res.json(product);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

// DELETE
export const deleteProduct = async (req, res) => {

  try {

    await prisma.product.delete({
      where: {
        id: Number(req.params.id)
      },
    });

    res.json({
      message: "Producto eliminado correctamente"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};