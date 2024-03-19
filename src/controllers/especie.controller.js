import Especie from "../models/especies.js";
import dotenv from "dotenv";
dotenv.config();

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;
const BAD_REQUEST = 400;

// Crear un nuevo Especie
export const createEspecie = async (req, res) => {
  console.log("create Especie");
  const { name, idCompany } = req.body;
  try {
    console.log("hola", req.body);
    const newEspecie = await Especie.create({ name, idCompany });
    res.status(HTTP_CREATED).json({
      httpStatus: HTTP_CREATED,
      category: newEspecie,
      message: "Especie registrada con éxito!",
    });
  } catch (error) {
    console.log("ER: ", error);
    res.status(400).json({ error: error });
  }
};

export const getEspecie = async (req, res) => {
  try {
    const item = await Especie.find().exec();
    if (item.length > 0) {
      return res.json({ httpStatus: +process.env.HTTP_OK, content: item });
    } else {
      return res.json({
        httpStatus: +process.env.HTTP_NO_CONTENT,
        content: item,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las Especies" });
  }
};
