import express from "express";
<<<<<<< HEAD
import { createAddProduct } from "../controllers/inventory.controller.js";
=======
import {
  createAddProduct,
} from "../controllers/inventory.controller.js"
>>>>>>> 7969aacf2228dd982ed859d611cc100a726ec11b

const router = express.Router();

//create Categoria
router.post("/", createAddProduct);
//router.get("/", getBusinessCategory);


export default router;
