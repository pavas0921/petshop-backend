import Venta from "../models/venta.js";
//import moment from "moment";
import moment from "moment-timezone";
import { updateStockById } from "./product.controller.js";
import { formatVentasDates } from "../helpers/dateUtils/convertDates.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
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

  // Convertir la fecha recibida a un objeto Moment
  let convertedDate = moment(date, "YYYY-MM-DD");

  // Ajustar la fecha a la hora actual de Colombia
  convertedDate = convertedDate.tz("America/Bogota").set({
    hour: moment.tz("America/Bogota").hour(),
    minute: moment.tz("America/Bogota").minute(),
    second: moment.tz("America/Bogota").second(),
    millisecond: moment.tz("America/Bogota").millisecond(),
  });

  console.log(convertedDate.toISOString());

  try {
    const newVenta = await Venta.create({
      date: convertedDate.toISOString(),
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
    endDateObj.setUTCHours(23, 59, 59, 999);
    console.log("start: ", startDateObj);
    console.log("end: ", endDateObj);

    // Consultar la base de datos para obtener las ventas dentro del rango de fechas
    const items = await Venta.find({
      date: { $gte: startDateObj, $lte: endDateObj },
      companyId: idCompany,
    })
      .populate("idCliente")
      .exec();

    const computedSales = items.map((item) => ({
      _id: item._id,
      date: moment(item.date).tz("America/Bogota").format("DD/MM/YYYY"),
      payMethod: item.payMethod,
      saleType: item.saleType,
      totalVenta: item.totalVenta,
      cliente: item.idCliente._id,
      fullName: item.idCliente.firstName + " " + item.idCliente.lastName,
      detalleVenta: item.detalleVenta,
    }));

    console.log("items: ", computedSales);
    if (computedSales.length > 0) {
      return res.json({
        httpStatus: +process.env.HTTP_OK,
        content: computedSales,
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
    res.status(+process.env.HTTP_INTERNAL_SERVER_ERROR).json({ error: error });
  }
};

//Obtener la cantidad de ventas del día
export const getDailyTotalSales = async (req, res) => {
  try {
    const { idCompany, date } = req.body;
    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);
    const totalSales = await Venta.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(date),
            $lte: endDate,
          },
          companyId: new ObjectId(idCompany),
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalVenta" }, // Usar el campo totalVenta para sumar el monto total de las ventas
        },
      },
    ]);
    if (totalSales.length > 0) {
      return res.json({
        httpStatus: +process.env.HTTP_OK,
        content: totalSales[0].totalAmount,
        status: "success",
      });
    } else {
      return res.json({
        httpStatus: +process.env.HTTP_NO_CONTENT,
        content: 0, // Si no hay ventas, devolver 0 como valor total
        status: "success",
      });
    }
  } catch (error) {
    res
      .status(+process.env.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
