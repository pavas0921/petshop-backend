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
