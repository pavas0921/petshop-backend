import expensesCategory from "../models/expensesCategory.js";
import dotenv from "dotenv";
dotenv.config();

//Crear una nueva categoria de gastos

export const createCategoryExpense = async (req, res) => {
  const { category_name, idCompany, status } = req.body;
  try {
    const item = await expensesCategory.create({
      category_name,
      idCompany,
      status,
    });
    if (item) {
      return res.status(+process.env.HTTP_CREATED).json({
        message: "Categoría registrada con éxito.",
        httpStatus: +process.env.HTTP_CREATED,
        status: "success",
        category: item,
      });
    } else {
      return res.status(+process.env.BAD_REQUEST).json({
        message: "Hubo un problema al registrar la categoría.",
        httpStatus: +process.env.BAD_REQUEST,
        status: "error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(process.env.HTTP_INTERNAL_SERVER_ERROR).json({
      error: error,
      httpStatus: process.env.HTTP_INTERNAL_SERVER_ERROR,
    });
  }
};

//Obtener Categorias por compañía
export const getCategoryByCompany = async (req, res) => {
  const idCompany = req.params.idCompany;
  try {
    const item = await expensesCategory.find({ idCompany: idCompany }).exec();
    if (item.length > 0) {
      return res.json({
        httpStatus: +process.env.HTTP_OK,
        content: item,
        status: "success",
      });
    } else {
      return res.json({ status: +process.env.HTTP_NO_CONTENT, content: item });
    }
  } catch (error) {
    console.log(error);
    res
      .status(+process.env.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Error al obtener las categorias" });
  }
};
