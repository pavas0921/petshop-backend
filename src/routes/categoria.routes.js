import express from "express";
import {
  createCategoria,
  getCategoria,
  getCategoriaByIdCompany,
} from "../controllers/categoria.controller.js";

const router = express.Router();

//create Categoria
router.post("/", createCategoria);
router.get("/", getCategoria);
router.get("/:idCompany", getCategoriaByIdCompany);

export default router;
