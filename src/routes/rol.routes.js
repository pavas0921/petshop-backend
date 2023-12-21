import express from "express";
import { createRol, getAllRoles } from "../controllers/rol.controller.js";

const router = express.Router();

//create rol
router.post("/", createRol);
router.get("/", getAllRoles)

export default router;
