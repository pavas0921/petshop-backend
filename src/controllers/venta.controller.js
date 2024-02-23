import Venta from "../models/venta.js";
import { updateStockById } from "./product.controller.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Crear un nuevo producto
export const createVenta = async (req, res) => {
  const { date, IdCliente, detalleVenta, totalVenta } = req.body;
  try {
    const newVenta = await Venta.create({
      date,
      IdCliente,
      detalleVenta,
      totalVenta,
    });
    if(newVenta){
      const result = await updateStockById(req, res)
      if(result.modifiedCount > 0){
        return res.status(HTTP_OK).json({
          message: "Venta registrada con éxito e inventario actualizado.",
          httpStatus: HTTP_OK,
          status: "success",
          venta: newVenta,
        });
      }
    }else{
      return res.status(HTTP_NOT_FOUND).json({
        message: "Hubo un problema al registrar la venta.",
        httpStatus: HTTP_NOT_FOUND,
        status: "success",
        venta: newVenta,
      });
    }    
  } catch (error) {
    return res.status(500).json({ error: error });
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
    res.status(400).json({ error: error });
  }
};
