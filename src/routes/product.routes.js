import express from "express";
import {
  createProduct,
  getAllProduct,
  getProductsByCompanyId,
  updateProductStatusById,
} from "../controllers/product.controller.js";

const router = express.Router();

//create Especie
router.get("/", getAllProduct);
router.post("/", createProduct);
router.get("/company/:idCompany", getProductsByCompanyId);
router.put("/updateStatus/:_id", updateProductStatusById);

export default router;
