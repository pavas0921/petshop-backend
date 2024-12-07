import express from "express";
import {
  createProduct,
  getAllProduct,
  getProductsByCompanyId,
  getActiveProductsByCompany,
  updateProductStatusById,
  updateProductById
} from "../controllers/product.controller.js";

const router = express.Router();

//create Especie
router.get("/", getAllProduct);
router.post("/", createProduct);
router.get("/company/:idCompany", getActiveProductsByCompany);
router.get("/company/:idCompany/all", getProductsByCompanyId)
router.put("/updateStatus/:_id", updateProductStatusById);
router.patch("/updateProduct/:_id", updateProductById);


export default router;
