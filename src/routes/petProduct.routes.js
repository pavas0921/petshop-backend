import express from "express";
import {
  createPetProduct,
  getAllProduct,
} from "../controllers/petProduct.controller.js";

const router = express.Router();

//create Especie
router.get("/", getAllProduct);
router.post("/", createPetProduct);

export default router;
