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
  const { name, lastname, id, password, rolId, companyId } = req.body;
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
