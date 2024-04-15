// Importa el modelo de proveedor
import Supplier from "../models/supplier.js";
import dotenv from "dotenv";
dotenv.config();

export const getAllSupplier = async (req, res) => {
  try {
    const item = await Supplier.find().exec();
    if (item.length > 0) {
      return res.json({ httpStatus: +process.env.HTTP_OK, content: item });
    } else {
      return res.json({
        httpStatus: +process.env.HTTP_NO_CONTENT,
        content: item,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};

// Crea un nuevo proveedor
export const createSupplier = async (req, res) => {
  try {
    const { nit, companyName, commercialAdvisor, phone, address, idCompany } =
      req.body;
    const item = await Supplier.create({
      nit,
      companyName,
      commercialAdvisor,
      phone,
      address,
      idCompany,
    });

    // Verifica si el proveedor se creó correctamente
    if (item) {
      // Envía una respuesta al cliente con los detalles del proveedor creado
      res.status(+process.env.HTTP_CREATED).json({
        status: "success",
        message: "Proveedor creado exitosamente",
        content: item,
        httpStatus: +process.env.HTTP_CREATED,
      });
    } else {
      // Si no se creó correctamente, envía un mensaje de error
      res.status(500).json({
        status: "error",
        error: "Error al crear el proveedor en la base de datos",
      });
    }
  } catch (error) {
    console.log(error);
    // Manejo de errores
    res.status(500).json({
      success: false,
      error: "Error al crear el proveedor",
      status: "error",
    });
  }
};
