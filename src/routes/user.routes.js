import express from "express";
import { createUser, login } from "../controllers/user.controller.js";
import { generateToken } from "../helpers/generateToken.js";

const router = express.Router();

//Crear Fave
router.post("/", createUser);
router.post("/login", login, generateToken);

export default router;
