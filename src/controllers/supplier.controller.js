// Importa el modelo de proveedor
import Supplier from "../models/supplier.js";
import dotenv from "dotenv";
dotenv.config();

export const getSupplierByCompany = async (req, res) => {
  const idCompany = req.params.idCompany;
  try {
    const item = await Supplier.find({ idCompany }).exec();
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

// Actualizar un proveedor por su ID
export const updateSupplierById = async (req, res) => {
  const _id = req.params._id;
  // Extraer los campos que se pueden actualizar
  const { nit, companyName, commercialAdvisor, phone, address } = req.body;

  try {
    // Buscar el proveedor por su ID y actualizar los campos proporcionados
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      _id,
      {
        nit,
        companyName,
        commercialAdvisor,
        phone,
        address,
      },
      { new: true } // Devuelve el documento actualizado
    );
    // Verificar si el Proveedor existe y fue actualizado
    if (updatedSupplier) {
      return res.json({
        httpStatus: +process.env.HTTP_OK,
        message: "Proveedor actualizado con éxito",
        status: "success",
        updated: updatedSupplier,
      });
    } else {
      // Si el clieProveedornte no existe
      return res.status(+process.env.HTTP_NOT_FOUND).json({
        httpStatus: +process.env.HTTP_NOT_FOUND,
        message: "Proveedor no encontrado",
        status: "error",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
