import Venta from "../models/venta.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Crear un nuevo producto
export const createVenta = async (req, res) => {
  const { date, cliente, detalleVenta, totalVenta } = req.body;
  try {
    console.log("createproduct", req.body);
    const newVenta = await Venta.create({
      date,
      cliente,
      detalleVenta,
      totalVenta,
    });
    res.status(HTTP_OK).json({
      message: "Venta registrada con éxito",
      httpStatus: HTTP_OK,
      status: "success",
      venta: newVenta,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener todos los ventas
export const getAllVentas = async (req, res) => {
  try {
    const item = await Venta.find()
      .populate({
        path: "detalleVenta",
        populate: {
          path: "detalleProducto",
          model: "DetalleProducto", // Nombre del modelo
          populate: {
            path: "idProducto",
            model: "Producto",
            select: "name",
          },
        },
      })
      .exec();
    if (item.length > 0) {
      const computedData = item.map((item) => ({
        idVenta: item._id,
        cliente: item.cliente,
        detalleVenta: item.detalleVenta,
        precioUnitario: item.precioUnitario,
        totalVenta: item.totalVenta,
      }));
      return res.json({ status: HTTP_OK, detalleVenta: computedData });
    } else {
      return res.json({ status: HTTP_NO_CONTENT, item });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
