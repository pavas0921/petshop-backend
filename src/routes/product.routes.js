import express from "express";
import {
  createProduct,
  getAllProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

//create Especie
router.get("/", getAllProduct);
router.post("/", createProduct);

export default router;
