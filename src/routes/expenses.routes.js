import express from "express";
import {
  createExpense,
  getAllExpensesByCompany,
  getDailyTotalExpenses,
  getExpensesByDateRange
} from "../controllers/expense.controller.js";

const router = express.Router();

//create Categoria
router.post("/", createExpense);
router.get("/company/:idCompany", getAllExpensesByCompany);
router.post("/dailyCount", getDailyTotalExpenses);
router.post("/rangeDate", getExpensesByDateRange);

export default router;
