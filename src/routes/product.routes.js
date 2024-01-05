import express from "express";
import {
  createProduct,
  getAllProduct,
  getProductsByCompanyId,
  deleteProductById
} from "../controllers/product.controller.js";

const router = express.Router();

//create Especie
router.get("/", getAllProduct);
router.post("/", createProduct);
router.get("/company/:idCompany", getProductsByCompanyId )
router.delete("/:idProduct", deleteProductById )

export default router;
