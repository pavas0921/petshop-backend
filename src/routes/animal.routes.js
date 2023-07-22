import express from "express";
import {
  createAnimal,
  getAllAnimal,
} from "../controllers/animal.controller.js";

const router = express.Router();

//Crear Fave
router.post("/", createAnimal);
router.get("/", getAllAnimal);

export default router;
