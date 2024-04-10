// Importa el modelo de proveedor
import Supplier from "../models/supplier.js";
import dotenv from "dotenv";
dotenv.config();

// Crea un nuevo proveedor
export const createSupplier = async (req, res) => {
  try {
    const { name, nit, idCompany } = req.body;
    const item = await Supplier.create({
      name,
      nit,
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
    // Manejo de errores
    res.status(500).json({
      success: false,
      error: "Error al crear el proveedor",
      status: "error",
    });
  }
};
