import Customer from "../models/customer.js";

const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;

// Crear una compañia
export const createCustomer = async (req, res) => {
  const { cedula, firstName, lastName, phone, address, comments, idCompany } = req.body;
  try {
    const newCustomer = await Customer.create({ cedula, firstName, lastName, phone, address, comments, idCompany });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getCustomerByCompany = async (req, res) => {
    const idCompany = req.params.idCompany;
  try {
    const item = await Customer
    .find({ idCompany: idCompany }).exec();
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
    console.log(error)
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};
