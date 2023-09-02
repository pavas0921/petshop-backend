import express from "express";
import { createCategoria } from "../controllers/categoria.controller.js";

const router = express.Router();

//create Categoria
router.post("/", createCategoria);

export default router;
