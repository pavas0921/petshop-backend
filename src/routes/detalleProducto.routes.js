import express from "express";
import {
  createDetalleProducto,
  getAllProductDetails,
  getAllProductsById,
  updateStockById
} from "../controllers/detalleProducto.controller.js";

const router = express.Router();


router.post("/", createDetalleProducto);
router.post("/updateStock", updateStockById);
router.get("/", getAllProductDetails);
router.get("/:idProducto", getAllProductsById);

export default router;
