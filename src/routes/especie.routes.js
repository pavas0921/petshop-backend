import express from "express";
import { createEspecie } from "../controllers/especie.controller.js";

const router = express.Router();

//create Especie
router.post("/", createEspecie);

export default router;
