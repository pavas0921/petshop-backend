import express from "express";
import {
  createCategoria,
  getCategoria,
} from "../controllers/categoria.controller.js";

const router = express.Router();

//create Categoria
router.post("/", createCategoria);
router.get("/", getCategoria);

export default router;
