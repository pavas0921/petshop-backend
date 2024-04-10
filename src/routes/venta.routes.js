import express from "express";
import {
  createVenta,
  getVentasByDateRange,
  getAllVentasByCompany,
  getDailySalesCount,
} from "../controllers/venta.controller.js";

const router = express.Router();

//create Categoria
router.post("/", createVenta);
router.get("/company/:idCompany", getAllVentasByCompany);
router.post("/rangeDate", getVentasByDateRange);
router.post("/dailyCount", getDailySalesCount);

export default router;
