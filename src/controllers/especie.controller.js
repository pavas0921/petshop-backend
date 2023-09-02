import Especie from "../models/especies.js";

// Crear un nuevo Especie
export const createEspecie = async (req, res) => {
  console.log("create Especie");
  const { name } = req.body;
  try {
    const newEspecie = await Especie.create({ name });
    res.status(201).json(newEspecie);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getEspecie = async (req, res) => {
  console.log("hola");
  try {
    const especieItem = await Especie.find().exec();
    if (especieItem.length) return res.json({ status: 201, especieItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las especies" });
  }
};
