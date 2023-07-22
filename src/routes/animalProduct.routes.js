import express from "express";
import {
  createAnimalProduct,
  getAllAnimalProduct,
  getAllDogProduct,
} from "../controllers/animalProduct.controller.js";

const router = express.Router();

//Crear Fave
router.get("/", getAllAnimalProduct);
router.post("/", createAnimalProduct);
router.get("/dog", getAllDogProduct);

export default router;
