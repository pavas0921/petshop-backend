import express from "express";
import {
  createCategoryExpense,
  getCategoryByCompany,
  updateExpensesCategoryStatus,
} from "../controllers/expensesCategoryController.js";

const router = express.Router();

//create Company
router.post("/", createCategoryExpense);
router.get("/:idCompany", getCategoryByCompany);
router.put("/:idCategory", updateExpensesCategoryStatus);

export default router;
