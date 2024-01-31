import express from "express";
import {
  createProduct,
  getAllProduct,
  getProductsByCompanyId,
  updateProductStatusById,
  updateProductById
} from "../controllers/product.controller.js";

const router = express.Router();

//create Especie
router.get("/", getAllProduct);
router.post("/", createProduct);
router.get("/company/:idCompany", getProductsByCompanyId);
router.put("/updateStatus/:_id", updateProductStatusById);
router.patch("/updateProduct/:_id", updateProductById);

export default router;
