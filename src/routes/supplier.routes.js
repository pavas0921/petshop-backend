import express from "express";
import { createSupplier } from "../controllers/supplier.controller.js";

const router = express.Router();

//create Especie
//router.get("/", getAllUser);
router.post("/", createSupplier);
//router.post("/login", login, generateToken);

export default router;
