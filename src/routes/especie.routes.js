import express from "express";
import {
  createEspecie,
  getEspecie,
  getEspecieByCompany,
} from "../controllers/especie.controller.js";

const router = express.Router();

//create Especie
router.post("/", createEspecie);
router.get("/", getEspecie);
router.get("/:idCompany", getEspecieByCompany);

export default router;
