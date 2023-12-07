import express from "express";
import {
  createBusinessCategory,
  getBusinessCategory,
} from "../controllers/businessCategory.controller.js"

const router = express.Router();

//create Categoria
router.post("/", createBusinessCategory);
router.get("/", getBusinessCategory);

export default router;
