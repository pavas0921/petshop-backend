import express from "express";
import {
  registerSurvey,
  getAllSurveys
} from "../controllers/muezzaSurvey.controller.js";

const router = express.Router();

//create Categoria
router.post("/", registerSurvey);
router.get("/", getAllSurveys);

export default router;
