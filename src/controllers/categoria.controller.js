import Categoria from "../models/categoria.js";

// Crear un nuevo Categoria
export const createCategoria = async (req, res) => {
  console.log("create Categoria");
  const { name } = req.body;
  try {
    const newCategoria = await Categoria.create({ name });
    res.status(201).json(newCategoria);
  } catch (error) {
    Categoria;
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getCategoria = async (req, res) => {
  console.log("hola");
  try {
    const categoriaItem = await Categoria.find().exec();
    if (categoriaItem.length) return res.json({ status: 201, categoriaItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};
