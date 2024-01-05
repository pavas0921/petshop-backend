import express from "express";
import { createAddProduct } from "../controllers/inventory.controller.js";


const router = express.Router();

//create Categoria
router.post("/", createAddProduct);
//router.get("/", getBusinessCategory);


export default router;
