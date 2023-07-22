import express from "express";
import {
  createProduct,
  getAllProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

//Crear Fave
router.post("/", createProduct);
router.get("/", getAllProduct);

export default router;
