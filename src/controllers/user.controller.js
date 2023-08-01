import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { cedula, name, lastname, address, phone, email, passwordHash, idRol } =
    req.body;
  const hash = bcrypt.hashSync(passwordHash, 12);
  try {
    const newUser = await prisma.user.create({
      data: {
        cedula: cedula,
        name: name,
        lastname: lastname,
        address: address,
        phone: phone,
        email: email,
        passwordHash: hash,
        idRol: +idRol,
      },
    });
    res.status(201).json({ status: 201, newUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if(user && bcrypt.compareSync(password, user.passwordHash)){
      req.body.user = user;
      next();
    }
    else{
      return res.status(HTTP_NOT_FOUND).json({ error: true, message: "Credenciales incorrectas" });
    }      
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: true });
  }
};
