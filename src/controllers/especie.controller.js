import Especie from "../models/especies.js";
import dotenv from "dotenv";
dotenv.config();

// Crear un nuevo Especie
export const createEspecie = async (req, res) => {
  console.log("create Especie");
  const { name, idCompany } = req.body;
  try {
    const newEspecie = await Especie.create({ name, idCompany });
    res.status(+process.env.HTTP_CREATED).json({
      httpStatus: +process.env.HTTP_CREATED,
      category: newEspecie,
      message: "Especie registrada con éxito!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getEspecie = async (req, res) => {
  try {
    const item = await Especie.find().exec();
    if (item.length > 0) {
      return res.json({ httpStatus: +process.env.HTTP_OK, content: item });
    }else{
      return res.json({ httpStatus: +process.env.HTTP_NO_CONTENT, content: item });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al obtener las Especies" });
  }
};
