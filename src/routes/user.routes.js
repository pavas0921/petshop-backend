import express from "express";
import { createUser, login, getAllUser } from "../controllers/user.controller.js";

import { generateToken } from "../helpers/generateToken.js";

const router = express.Router();

//create Especie
router.get("/", getAllUser);
router.post("/", createUser);
router.post("/login", login, generateToken);

export default router;
