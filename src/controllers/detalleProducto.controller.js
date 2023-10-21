import DetalleProducto from "../models/detalleProducto.js";
import Producto from "../models/producto.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Crear un nuevo Especie
export const createDetalleProducto = async (req, res) => {
  const {
    presentacion,
    porcentajeUtilidad,
    precioCosto,
    precioVenta,
    stock,
    idProducto,
  } = req.body;
  try {
    const newDetalleProducto = await DetalleProducto.create({
      presentacion,
      porcentajeUtilidad,
      precioCosto,
      precioVenta,
      stock,
      idProducto,
    });
    res.status(201).json({ status: 201, DetalleProducto: newDetalleProducto });
    console.log(newDetalleProducto);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener todos los detalles de productos
export const getAllProductDetails = async (req, res) => {
  try {
    const item = await DetalleProducto.find().populate().populate("idProducto");

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

// Obtener todos los detalles por idProducto

export const getAllProductsById = async (req, res) => {
  try {
    const { idProducto } = req.params;
    const item = await DetalleProducto.find({
      idProducto: idProducto,
    }).populate({ path: "idProducto", select: "name" });
    if (item.length > 0) {
      const computedData = item.map((item) => ({
        idDetalle: item._id,
        idProducto: item.idProducto._id,
        nombreProducto: item.idProducto.name,
        presentacion: item.presentacion,
        margenGanancia: item.porcentajeUtilidad,
        precioCosto: item.precioCosto,
        precioVenta: item.precioVenta,
        stock: item.stock,
      }));
      return res.json({ status: HTTP_OK, computedData });
    } else {
      return res.json({ status: HTTP_NO_CONTENT, item });
    }
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({
      status: HTTP_INTERNAL_SERVER_ERROR,
      error: "Hubo un error al obtener los productos",
    });
  }
};
