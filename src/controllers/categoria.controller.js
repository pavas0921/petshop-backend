import Categoria from "../models/categoria.js";
import dotenv from "dotenv";
dotenv.config();

// Crear un nuevo Categoria
export const createCategoria = async (req, res) => {
  console.log("create Categoria", req.body);
  const { name, idCompany } = req.body;
  try {
    const newCategoria = await Categoria.create({ name, idCompany });
    res.status(+process.env.HTTP_CREATED).json({
      httpStatus: +process.env.HTTP_CREATED,
      category: newCategoria,
      message: "¡Categoria registrada con éxito!",
    });
  } catch (error) {
    Categoria;
    console.log(error);
    res.status(process.env.HTTP_OK).json({ error: error });
  }
};

export const getCategoria = async (req, res) => {
  try {
    const item = await Categoria.find().exec();
    if (item.length > 0) {
      return res.json({ httpStatus: +process.env.HTTP_OK, content: item });
    } else {
      return res.json({
        httpStatus: +process.env.HTTP_NO_CONTENT,
        content: item,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};

export const getCategoriaByIdCompany = async (req, res) => {
  const idCompany = req.params.idCompany
  try {
    const item = await Categoria.find({ idCompany: idCompany }).exec();
    if (item.length > 0) {
      return res.json({ httpStatus: +process.env.HTTP_OK, content: item });
    } else {
      return res.json({
        httpStatus: +process.env.HTTP_NO_CONTENT,
        content: item,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};

