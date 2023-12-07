import { updateOperations } from "../helpers/detalleProductos/calculateUpdateOperations.js";
import { sortArray } from "../helpers/detalleProductos/sortArray.js";
import DetalleProducto from "../models/detalleProducto.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Crear un nuevo producto
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
    const item = await DetalleProducto.find()
      .populate()
      .populate("idProducto")
      .sort({ "idProducto.name": 1 });
    if (item.length > 0) {
      const computedData = item.map((item) => ({
        idDetalle: item._id,
        idProducto: item.idProducto._id,
        nombreProducto: item.idProducto.name + " " + item.presentacion,
        margenGanancia: item.porcentajeUtilidad,
        precioCosto: item.precioCosto,
        precioVenta: item.precioVenta,
        stock: item.stock,
      }));
      const sortedComputedData = sortArray(computedData);
      console.log(computedData);
      return res.json({ status: HTTP_OK, item: computedData });
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
  console.log("hola");
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

//Obtener los detalles de un producto por su ID
export const getDetalleProductoById = async (req, res) => {
  const _id = req.params;
  console.log("¨¨¨¨", _id);
  try {
    const item = await DetalleProducto.find({
      _id: _id,
    }).populate({ path: "idProducto", select: "name" });
    if (item.length > 0) {
      const computedData = item.map((item) => ({
        _id: item._id,
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

export const getSeveralProductsDetails = async (products) => {
  try {
    if (products.length > 0) {
      // Obtener solo los IDs de los productos a actualizar
      const productIds = products.map((product) => product.detalleProducto);

      const items = await DetalleProducto.find({ _id: { $in: productIds } });

      if (items.length > 0) {
        return items;
      } else {
        return res.json({ status: HTTP_NO_CONTENT, items });
      }
    } else {
      return res.json({ status: HTTP_INTERNAL_SERVER_ERROR });
    }
  } catch (error) {
    return res.json({ status: HTTP_INTERNAL_SERVER_ERROR });
  }
};

export const updateStockById = async (req, res) => {
  try {
    const { detalleVenta } = req.body;
    if (detalleVenta.length > 0) {
      const productos = await getSeveralProductsDetails(detalleVenta);
      if (productos.length > 0) {
        const updatedProducts = updateOperations(productos, detalleVenta);
        const result = await DetalleProducto.bulkWrite(updatedProducts);
        return result;
      }
    }
  } catch (error) {
    console.log(error);
    //return res.json({ status: HTTP_INTERNAL_SERVER_ERROR, error: error })
  }
};
