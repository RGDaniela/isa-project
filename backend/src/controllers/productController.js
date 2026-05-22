import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      imageUrl,
      category
    } = req.body;

    if (!name || !description || price == null || stock == null || !category) {
      return res.status(400).json({
        error: "Faltan campos obligatorios"
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        imageUrl: imageUrl || null,
        category
      }
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
export const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      imageUrl,
      category,
      isActive
    } = req.body;

    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price != null && { price: Number(price) }),
        ...(stock != null && { stock: Number(stock) }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(category && { category }),
        ...(isActive !== undefined && { isActive })
      }
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// DELETE
export const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};