import express from "express";
import {
  createSupplier,
  getSupplierByCompany,
} from "../controllers/supplier.controller.js";

const router = express.Router();

//create Especie
router.post("/", createSupplier);
router.get("/:idCompany", getSupplierByCompany);

export default router;
