import product from "../models/product.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  const {
    productName,
    barCode,
    image,
    costPrice,
    salePrice,
    idEspecie,
    stock,
    idCategoria,
    idCompany,
    createdBy,
    status = true,
  } = req.body;
  console.log("req.body", req.body);
  try {
    const newProducto = await product.create({
      productName,
      barCode,
      image,
      costPrice,
      salePrice,
      stock,
      idEspecie,
      idCategoria,
      idCompany,
      createdBy,
      status,
    });
    res.status(HTTP_CREATED).json({
      message: "Producto registrado con éxito",
      httpStatus: HTTP_CREATED,
      status: "success",
      producto: newProducto,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener todos los productos
export const getAllProduct = async (req, res) => {
  try {
    const item = await product.find().exec();
    if (item.length > 0) {
      return res.json({
        httpStatus: HTTP_OK,
        content: item,
        status: "success",
      });
    } else {
      return res.json({ status: HTTP_NO_CONTENT, item });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener por productos por compañía
export const getProductsByCompanyId = async (req, res) => {
  const idCompany = req.params.idCompany;
  try {
    const item = await product
      .find({ idCompany: idCompany })
      .populate("idCategoria")
      .populate("idEspecie")
      .exec();
    if (item.length > 0) {
      return res.json({
        httpStatus: HTTP_OK,
        content: item,
        status: "success",
      });
    } else {
      return res.json({ status: HTTP_NO_CONTENT, item });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const updateProductStatusById = async (req, res) => {
  const _id = req.params._id;
  console.log("----", req.body);
  const newStatus = req.body.status; // Asegúrate de enviar el nuevo estado en el cuerpo de la solicitud

  try {
    // Buscar el producto por su ID y actualizar el estado
    const updatedProduct = await product.findByIdAndUpdate(
      _id,
      { status: newStatus },
      { new: true } // Devuelve el documento actualizado
    );

    // Verificar si el producto existe y fue actualizado
    if (updatedProduct) {
      return res.json({
        httpStatus: HTTP_OK,
        message: "Estado del producto actualizado con éxito",
        status: "success",
        updated: updatedProduct,
      });
    } else {
      // Si el producto no existe
      return res.status(HTTP_NOT_FOUND).json({
        httpStatus: HTTP_NOT_FOUND,
        message: "Producto no encontrado",
        status: "error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
