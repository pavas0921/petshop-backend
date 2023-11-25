import express from "express";
import { createRol } from "../controllers/rol.controller.js";

const router = express.Router();

//create rol
router.post("/", createRol);

export default router;
