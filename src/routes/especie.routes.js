import express from "express";
import {
  createEspecie,
  getEspecie,
} from "../controllers/especie.controller.js";

const router = express.Router();

//create Especie
router.post("/", createEspecie);
router.get("/", getEspecie);

export default router;
