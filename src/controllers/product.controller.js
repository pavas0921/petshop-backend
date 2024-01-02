import product from "../models/product.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  const {
    productName,
    barCode,
    image,
    costPrice,
    salePrice,
    idEspecie,
    idCategoria,
    idCompany,
    createdBy,
  } = req.body;
  console.log("req.body", req.body);
  try {
    const newProducto = await product.create({
      productName,
      barCode,
      image,
      costPrice,
      salePrice,
      idEspecie,
      idCategoria,
      idCompany,
      createdBy,
    });
    res.status(HTTP_OK).json({
      message: "Producto registrado con éxito",
      httpStatus: HTTP_OK,
      status: "success",
      producto: newProducto,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener todos los productos
export const getAllProduct = async (req, res) => {
  try {
    const item = await product
      .find()
      .populate()
      .populate("idCategoria")
      .populate("idEspecie");
    if (item.length > 0) {
      const computedData = item.map((item) => ({
        idProducto: item._id,
        nombreProducto: item.name,
        nombreCategoria: item.idCategoria.name,
        nombreEspecie: item.idEspecie.name,
      }));
      return res.json({ status: HTTP_OK, computedData });
    } else {
      return res.json({ status: HTTP_NO_CONTENT, item });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
