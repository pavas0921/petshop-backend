import express from "express";
import {
  createCompany, getCompany
} from "../controllers/company.controller.js";

const router = express.Router();

//create Company
router.post("/", createCompany);
router.get("/", getCompany);

export default router;
