import Venta from "../models/venta.js";
import { updateStockById } from "./product.controller.js";
import { formatVentasDates } from "../helpers/dateUtils/convertDates.js";
import dotenv from "dotenv";
dotenv.config();

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Registrar una nueva venta
export const createVenta = async (req, res) => {
  const {
    date,
    idCliente,
    detalleVenta,
    payMethod,
    saleType,
    totalVenta,
    companyId,
  } = req.body;
  try {
    const newVenta = await Venta.create({
      date,
      idCliente,
      detalleVenta,
      payMethod,
      saleType,
      totalVenta,
      companyId,
    });
    if (newVenta) {
      const result = await updateStockById(req, res);
      if (result.modifiedCount > 0) {
        return res.status(HTTP_OK).json({
          message: "Venta registrada con éxito e inventario actualizado.",
          httpStatus: HTTP_OK,
          status: "success",
          venta: newVenta,
        });
      }
    } else {
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

// Obtener todos los ventas de una compañía específica
export const getAllVentasByCompany = async (req, res) => {
  try {
    // Extraer el idCompany del cuerpo de la solicitud
    const { idCompany } = req.params;

    // Buscar ventas de la compañía especificada
    const ventas = await Venta.find({ companyId: idCompany }).exec();

    // Comprobar si se encontraron ventas para la compañía especificada
    if (ventas.length > 0) {
      // Si se encontraron ventas, devolverlas en la respuesta con un código HTTP_OK
      return res.json({
        httpStatus: +process.env.HTTP_OK,
        content: items,
        status: "success",
      });
    } else {
      // Si no se encontraron ventas, devolver un mensaje con un código HTTP_NO_CONTENT
      return res.json({
        httpStatus: +process.env.HTTP_NO_CONTENT,
        content: [],
        status: "success",
      });
    }
  } catch (error) {
    // Manejar errores y devolver un código de estado 400 con un mensaje de error
    res.status(400).json({ error: error.message });
  }
};

// Obtener ventas en un rango de fechas
export const getVentasByDateRange = async (req, res) => {
  try {
    const { startDate, endDate, idCompany } = req.body;

    // Validar las fechas de entrada
    if (!startDate || !endDate) {
      return res.status(+process.env.BAD_REQUEST).json({
        httpStatus: +process.env.BAD_REQUEST,
        message: "Fecha de inicio y Fecha de finalización son obligatorias.",
        status: "error",
        content: [],
      });
    }

    // Convertir las fechas de entrada a objetos Date
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Consultar la base de datos para obtener las ventas dentro del rango de fechas
    const items = await Venta.find({
      date: { $gte: startDateObj, $lte: endDateObj },
      companyId: idCompany,
    }).exec();

    // Formatear las fechas antes de enviarlas al cliente utilizando la función del archivo externo
    const ventasFormateadas = formatVentasDates(items);

    if (ventasFormateadas.length > 0) {
      return res.json({
        httpStatus: +process.env.HTTP_OK,
        content: ventasFormateadas,
        status: "success",
      });
    } else {
      return res.json({
        httpStatus: +process.env.HTTP_NO_CONTENT,
        content: [],
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(+process.env.HTTP_INTERNAL_SERVER_ERROR).json({ error: error });
  }
};

//Obtener la cantidad de ventas del día
export const getDailySalesCount = async (req, res) => {
  try {
    const { idCompany } = req.body;
    const today = new Date().toISOString().split("T")[0];
    const count = await Venta.countDocuments({
      date: {
        $gte: new Date(today),
        $lte: new Date(today).setHours(23, 59, 59, 999),
      },
      companyId: idCompany,
    });
    if (count > 0) {
      return res.json({
        httpStatus: +process.env.HTTP_OK,
        content: count,
        status: "success",
      });
    } else {
      return res.json({
        httpStatus: +process.env.HTTP_NO_CONTENT,
        content: count,
        status: "success",
      });
    }
  } catch (error) {
    res
      .status(+process.env.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
