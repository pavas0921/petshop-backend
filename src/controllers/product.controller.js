import Producto from "../models/producto.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Crear un nuevo Especie
export const createProduct = async (req, res) => {
  console.log("create Especie");
  const { name, productDetails, idEspecie, idCategoria } = req.body;
  try {
    const newProducto = await Producto.create({
      name,
      productDetails,
      idEspecie,
      idCategoria,
    });
    res.status(201).json(newProducto);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Crear un nuevo Especie
export const getAllProduct = async (req, res) => {
  console.log("create Especie");
  try {
    const item = await Producto.find().exec();
    if (item.length > 0) {
      return res.json({ status: HTTP_OK, item });
    } else {
      return res.json({ status: HTTP_NO_CONTENT, item });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const item = await Producto.find();
    if (item.length > 0) {
      return res.json({ status: HTTP_OK, item });
    } else {
      return res.json({ status: HTTP_NO_CONTENT, item });
    }
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({
      status: HTTP_INTERNAL_SERVER_ERROR,
      error: "Hubo un error al obtener los productos",
    });
  }
};
