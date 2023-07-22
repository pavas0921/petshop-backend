import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProduct = async (req, res) => {
  try {
    const newProduct = await prisma.product.findMany();
    if (newProduct.length >= 1) {
      res.status(200).json({ status: 201, data: newProduct });
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const createProduct = async (req, res) => {
  const { name } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: name,
      },
    });
    res.status(201).json({ status: 201, data: newProduct });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
