import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAnimalProduct = async (req, res) => {
  try {
    const newAnimalProduct = await prisma.animal_product.findMany({
      select: {
        id: true,
        animal: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
    });
    if (newAnimalProduct.length >= 1) {
      res.status(200).json({ status: 201, data: newAnimalProduct });
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const getAllDogProduct = async (req, res) => {
  try {
    const newAnimalProduct = await prisma.animal_product.findMany({
      where: {
        animal_id: 1,
      },
      select: {
        id: true,
        animal: {
          select: {
            name: true,
          },
        },
      },
    });
    if (newAnimalProduct.length >= 1) {
      res.status(200).json({ status: 201, data: newAnimalProduct });
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const createAnimalProduct = async (req, res) => {
  const { animal_id, product_id } = req.body;
  try {
    const newAnimalProduct = await prisma.animal_product.create({
      data: {
        animal_id: +animal_id,
        product_id: +product_id,
      },
    });
    res.status(201).json({ status: 201, data: newAnimalProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};
