import express from "express";
import {
  createCompany, getAllCompanies
} from "../controllers/company.controller.js";

const router = express.Router();

//create Company
router.post("/", createCompany);
router.get("/", getAllCompanies);

export default router;
