import express from "express";
import {
  createUser,
  login,
  getAllUser,
  getUserByCompany,
  updateUserById,
} from "../controllers/user.controller.js";

import { generateToken } from "../helpers/generateToken.js";

const router = express.Router();

//create Especie
router.get("/", getAllUser);
router.post("/", createUser);
router.get("/:idCompany", getUserByCompany);
router.post("/login", login, generateToken);
router.put("/:_id", updateUserById);
export default router;
