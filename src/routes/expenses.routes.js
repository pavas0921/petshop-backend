import express from "express";
import {
  createExpense,
  getAllExpensesByCompany,
  getDailyTotalExpenses,
} from "../controllers/expense.controller.js";

const router = express.Router();

//create Categoria
router.post("/", createExpense);
router.get("/company/:idCompany", getAllExpensesByCompany);
router.post("/dailyCount", getDailyTotalExpenses);

export default router;
