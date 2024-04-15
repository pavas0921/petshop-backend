import express from "express";
import { createSupplier, getAllSupplier } from "../controllers/supplier.controller.js";

const router = express.Router();

//create Especie
router.get("/", getAllSupplier);
router.post("/", createSupplier);
//router.post("/login", login, generateToken);

export default router;
