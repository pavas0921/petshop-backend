import express from "express";
import {
  createSupplier,
  getSupplierByCompany,
  updateSupplierById,
} from "../controllers/supplier.controller.js";

const router = express.Router();

//create Especie
router.post("/", createSupplier);
router.get("/:idCompany", getSupplierByCompany);
router.put("/:_id", updateSupplierById);

export default router;
