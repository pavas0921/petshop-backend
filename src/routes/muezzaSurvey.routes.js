import express from "express";
import {
  registerSurvey,
} from "../controllers/muezzaSurvey.controller.js";

const router = express.Router();

//create Categoria
router.post("/", registerSurvey);

export default router;
