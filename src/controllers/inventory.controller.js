import Rol from "../models/inventory.js";
// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Crear un nuevo Categoria
export const createAddProduct = async (req, res) => {
  const { companyId, petProductId, precioCosto, precioVenta, stock } = req.body;
  try {
    const newProduct = await Rol.create({
      companyId,
      petProductId,
      precioCosto,
      precioVenta,
      stock,
    });
    res
      .status(HTTP_CREATED)
      .json({ status: HTTP_CREATED, product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
