import express from "express";
import {
 createOwner, getAllOwner
} from "../controllers/owner.controller.js"

const router = express.Router();

//create Categoria
router.post("/", createOwner);
router.get("/", getAllOwner);

export default router;
