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
      const user = await User.create({
        name, lastname, id, password, rolId, companyId
      });
      res.status(HTTP_OK).json({
        message: "Usuario registrado con éxito",
        httpStatus: HTTP_OK,
        status: "success",
        user: user,
      });
    } else {
      res.status(BAD_REQUEST).json({
        message: "La contraseña no cumple con los requisitos de complejidad.",
        httpStatus: BAD_REQUEST,
        status: "error",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ httpStatus: HTTP_NOT_FOUND, error: error });
  }
};

export const login = async (req, res, next) => {
  console.log("login", req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
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
