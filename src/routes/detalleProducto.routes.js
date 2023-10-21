import express from "express";
import {
  createDetalleProducto,
  getAllProductDetails,
  getAllProductsById,
} from "../controllers/detalleProducto.controller.js";

const router = express.Router();

//create Especie
router.post("/", createDetalleProducto);
router.get("/", getAllProductDetails);
router.get("/:idProducto", getAllProductsById);

export default router;
