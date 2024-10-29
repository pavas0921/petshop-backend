import express from "express";
import {
  createExpense,
  getAllExpensesByCompany,
} from "../controllers/expense.controller.js";

const router = express.Router();

//create Categoria
router.post("/", createExpense);
router.get("/company/:idCompany", getAllExpensesByCompany);

export default router;
