import express from "express";
import { createVenta, getAllVentas } from "../controllers/venta.controller.js";

const router = express.Router();

//create Categoria
router.post("/", createVenta);
router.get("/", getAllVentas);

export default router;
