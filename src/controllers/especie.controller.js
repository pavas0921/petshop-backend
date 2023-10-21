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
  console.log("sadasdasdaS");
  try {
    const especieItem = await Especie.find().exec();
    if (especieItem.length > 0) {
      return res.json({ status: 201, especieItem });
    } else {
      return res.json({ status: HTTP_NO_CONTENT, especieItem });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};
