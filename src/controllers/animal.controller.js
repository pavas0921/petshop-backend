import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAnimal = async (req, res) => {
  const { name } = req.body;
  try {
    const newAnimal = await prisma.animal.create({
      data: {
        name: name,
      },
    });
    res.status(201).json({ status: 201, data: newAnimal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const getAllAnimal = async (req, res) => {
  try {
    const newAnimal = await prisma.animal.findMany({
      orderBy: {
        id: "asc",
      },
    });
    if (newAnimal.length >= 1) {
      res.status(200).json({ status: 201, data: newAnimal });
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
