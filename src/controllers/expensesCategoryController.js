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

export const updateExpensesCategoryStatus = async (req, res) => {
  try {
    const idCategory = req.params.idCategory;
    const newStatus = req.body.status;

    // Buscar la categoría por su ID y actualizar el estado
    const item = await expensesCategory.findByIdAndUpdate(
      idCategory,
      { status: newStatus },
      { new: true } // Devuelve el documento actualizado
    );

    // Verificar si la categoría existe y fue actualizada
    if (item) {
      return res.json({
        httpStatus: +process.env.HTTP_OK,
        message: "Estado de la categoría actualizada con éxito",
        status: "success",
        updated: item,
      });
    } else {
      // Si el producto no existe
      return res.status(+process.env.HTTP_NO_CONTENT).json({
        httpStatus: +process.env.HTTP_NO_CONTENT,
        message: "Categoría no encontrada",
        status: "error",
      });
    }
  } catch (error) {
    res
      .status(+process.env.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
