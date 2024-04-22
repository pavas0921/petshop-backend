import User from "../models/user.js";
import bcrypt from "bcrypt";
import { validatePassword } from "../helpers/validatePassword.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;
const BAD_REQUEST = 400;

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { name, lastname, id, password, rolId, companyId, status } = req.body;
  const isValidPassword = validatePassword(password);
  try {
    if (isValidPassword) {
      const hash = bcrypt.hashSync(password, 12);
      const item = await User.create({
        name,
        lastname,
        id,
        password: hash,
        rolId,
        companyId,
        status,
      });
      res.status(HTTP_CREATED).json({
        message: "Usuario registrado con éxito",
        httpStatus: HTTP_CREATED,
        status: "success",
        content: item,
      });
    } else {
      res.status(BAD_REQUEST).json({
        message: "La contraseña no cumple con los requisitos de complejidad.",
        httpStatus: BAD_REQUEST,
        status: "error",
      });
    }
  } catch (error) {
    console.log("ER: ", error);
    res.json({ httpStatus: HTTP_NOT_FOUND, error: error });
  }
};

// Obtener todos los detalles de productos
export const getAllUser = async (req, res) => {
  try {
    const item = await User.find()
      .populate()
      .populate("rolId")
      .populate("companyId");
    if (item.length > 0) {
      const computedData = item.map((users) => ({
        _id: users._id,
        name: users.name,
        lastname: users.lastname,
        id: users.id,
        rol: users.rolId.name,
        company: users.companyId.company,
      }));
      res.status(+process.env.HTTP_CREATED).json({
        httpStatus: +process.env.HTTP_CREATED,
        content: item,
        status: "success",
      });
    } else {
      return res.json({ status: HTTP_NO_CONTENT, status: "success" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener todos los detalles de productos
export const getUserByCompany = async (req, res) => {
  const idCompany = req.params.idCompany;
  try {
    const item = await User.find({ companyId: idCompany })
      .populate()
      .populate("rolId")
      .populate("companyId")
      .exec();
    if (item.length > 0) {
      res.status(+process.env.HTTP_OK).json({
        httpStatus: +process.env.HTTP_OK,
        content: item,
        status: "success",
      });
    } else {
      return res.json({
        httpStatus: +process.env.HTTP_NO_CONTENT,
        status: "success",
      });
    }
  } catch (error) {
    res.status(+process.env.HTTP_INTERNAL_SERVER_ERROR).json({
      httpStatus: +process.env.HTTP_INTERNAL_SERVER_ERROR,
      status: "error",
      message: "Se produjo un error al consultar los usuarios",
    });
  }
};

// Actualizar un usuario por su ID
export const updateUserById = async (req, res) => {
  const _id = req.params._id;
  // Extraer los campos que se pueden actualizar
  const { name, lastname, id, password, rolId, companyId, status } = req.body;
  try {
    // Buscar el proveedor por su ID y actualizar los campos proporcionados
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name,
        lastname,
        id,
        password,
        rolId,
        companyId,
        status,
      },
      { new: true } // Devuelve el documento actualizado
    );
    // Verificar si el Usuario existe y fue actualizado
    if (updatedUser) {
      return res.json({
        httpStatus: +process.env.HTTP_OK,
        message: "Usuario actualizado con éxito",
        status: "success",
        updated: updatedUser,
      });
    } else {
      // Si el Usuario no existe
      return res.status(+process.env.HTTP_NOT_FOUND).json({
        httpStatus: +process.env.HTTP_NOT_FOUND,
        message: "Usuario no encontrado",
        status: "error",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  const { id, password } = req.body;
  try {
    const user = await User.findOne({ id }).populate({
      path: "companyId",
      select: "logo",
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    } else {
      const isValidUser = bcrypt.compareSync(password, user.password); // true
      if (isValidUser) {
        req.body.user = user;
        next();
      } else {
        res
          .status(401)
          .json({ error: true, message: "User or password incorrect" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

// Actualizar el estado de un usuario
export const updateUserStatus = async (req, res) => {
  const _id = req.params._id;
  const newStatus = req.body.status; // Asegúrate de enviar el nuevo estado en el cuerpo de la solicitud

  try {
    // Buscar el producto por su ID y actualizar el estado
    const updatedProduct = await User.findByIdAndUpdate(
      _id,
      { status: newStatus },
      { new: true } // Devuelve el documento actualizado
    );
    console.log(updatedProduct);

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
