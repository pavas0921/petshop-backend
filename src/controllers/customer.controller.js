import Customer from "../models/customer.js";

const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Crear una compañia
export const createCustomer = async (req, res) => {
  const { cedula, firstName, lastName, phone, address, comments, idCompany } =
    req.body;
  try {
    const item = await Customer.create({
      cedula,
      firstName,
      lastName,
      phone,
      address,
      comments,
      idCompany,
    });
    res.status(HTTP_CREATED).json({
      message: "Cliente registrado con éxito",
      httpStatus: HTTP_CREATED,
      status: "success",
      content: item,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getCustomerByCompany = async (req, res) => {
  const idCompany = req.params.idCompany;
  try {
    const item = await Customer.find({ idCompany: idCompany }).exec();
    if (item.length > 0) {
      return res.json({
        httpStatus: HTTP_OK,
        content: item,
        status: "success",
      });
    } else {
      return res.json({ status: 204, item });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};

//Actualizar el estado de un cliente
export const updateCustomerStatusById = async (req, res) => {
  const _id = req.params._id;
  const newStatus = req.body.status; // Asegúrate de enviar el nuevo estado en el cuerpo de la solicitud

  try {
    // Buscar el cliente por su ID y actualizar el estado
    const updatedCustomer = await Customer.findByIdAndUpdate(
      _id,
      { status: newStatus },
      { new: true } // Devuelve el documento actualizado
    );

    // Verificar si el cliente existe y fue actualizado
    if (updatedCustomer) {
      return res.json({
        httpStatus: HTTP_OK,
        message: "Estado del cliente actualizado con éxito",
        status: "success",
        updated: updatedCustomer,
      });
    } else {
      // Si el cliente no existe
      return res.status(HTTP_NOT_FOUND).json({
        httpStatus: HTTP_NOT_FOUND,
        message: "Cliente no encontrado",
        status: "error",
      });
    }
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Actualizar un cliente por su ID
export const updateCustomerById = async (req, res) => {
  const _id = req.params._id;
  // Extraer los campos que se pueden actualizar
  const { cedula, firstName, lastName, phone, address, comments, idCompany } =
    req.body;

  try {
    // Buscar el Cliente por su ID y actualizar los campos proporcionados
    const updatedCustomer = await Customer.findByIdAndUpdate(
      _id,
      {
        cedula,
        firstName,
        lastName,
        phone,
        address,
        comments,
        idCompany,
      },
      { new: true } // Devuelve el documento actualizado
    );
    // Verificar si el Cliente existe y fue actualizado
    if (updatedCustomer) {
      return res.json({
        httpStatus: HTTP_OK,
        message: "Cliente actualizado con éxito",
        status: "success",
        updated: updatedCustomer,
      });
    } else {
      // Si el cliente no existe
      return res.status(HTTP_NOT_FOUND).json({
        httpStatus: HTTP_NOT_FOUND,
        message: "Cliente no encontrado",
        status: "error",
      });
    }
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
