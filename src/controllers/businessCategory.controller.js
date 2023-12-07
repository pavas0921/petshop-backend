import businessCategory from "../models/businessCategory.js";

// Crear un nuevo Categoria
export const createBusinessCategory = async (req, res) => {

  const { category_name, description } = req.body;
  try {
    const newCategoria = await businessCategory.create({ category_name, description });
    res.status(201).json(newCategoria);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error });
  }
};

export const getBusinessCategory = async (req, res) => {
  try {
    const newBussinessCategory = await businessCategory.find().exec();
    if (newBussinessCategory.length) return res.json({ status: 201, newBussinessCategory });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};
