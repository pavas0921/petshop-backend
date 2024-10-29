import Expenses from "../models/expenses.js";
import moment from "moment-timezone";
import dotenv from "dotenv";
dotenv.config();

// Crear un nuevo gasto
export const createExpense = async (req, res) => {
  const {
    date,
    category,
    cost,
    description,
    paymentMethod,
    paymentStatus,
    idSupplier,
    idCompany,
  } = req.body;
  try {
    const convertedDate = moment(date, "YYYY-MM-DD")
      .startOf("day")
      .toISOString();
    const newExpense = await Expenses.create({
      date: convertedDate,
      category,
      cost,
      description,
      paymentMethod,
      paymentStatus,
      idSupplier,
      idCompany,
    });
    if (newExpense) {
      return res.status(+process.env.HTTP_CREATED).json({
        message: "Gasto registrado con éxito.",
        httpStatus: +process.env.HTTP_CREATED,
        status: "success",
        gasto: newExpense,
      });
    } else {
      return res.status(+process.env.BAD_REQUEST).json({
        message: "Hubo un problema al registrar el gasto.",
        httpStatus: +process.env.BAD_REQUEST,
        status: "error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(+process.env.HTTP_INTERNAL_SERVER_ERROR).json({
      error: error,
      httpStatus: +process.env.HTTP_INTERNAL_SERVER_ERROR,
    });
  }
};

export const getAllExpensesByCompany = async (req, res) => {
  try {
    // Extraer el idCompany del cuerpo de la solicitud
    const { idCompany } = req.params;
    console.log(idCompany);
    // Buscar gastos de la compañía especificada
    const expenses = await Expenses.find({ idCompany: idCompany })
      .populate("category", "category_name")
      .populate("idSupplier", "companyName")
      .exec();

    // const computedExpenses = items.map((item) => ({
    //   _id: item._id,
    //   date: moment(item.date).tz("America/Bogota").format("DD/MM/YYYY"),
    //   category: item.payMethod,
    //   saleType: item.saleType,
    //   totalVenta: item.totalVenta,
    //   cliente: item.idCliente._id,
    //   fullName: item.idCliente.firstName + " " + item.idCliente.lastName,
    //   detalleVenta: item.detalleVenta,
    // }));

    expenses.date = moment(expenses.date)
      .tz("America/Bogota")
      .format("DD/MM/YYYY");

    // Comprobar si se encontraron gastos para la compañía especificada
    if (expenses.length > 0) {
      // Si se encontraron gastos, devolverlas en la respuesta con un código HTTP_OK
      return res.status(+process.env.HTTP_OK).json({
        httpStatus: +process.env.HTTP_OK,
        content: expenses,
        status: "success",
      });
    } else {
      // Si no se encontraron gastos, devolver un mensaje con un código HTTP_NO_CONTENT
      return res.status(+process.env.HTTP_NO_CONTENT).json({
        httpStatus: +process.env.HTTP_NO_CONTENT,
        content: [],
        status: "success",
      });
    }
  } catch (error) {
    // Manejar errores y devolver un código de estado 400 con un mensaje de error
    res
      .status(+process.env.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
