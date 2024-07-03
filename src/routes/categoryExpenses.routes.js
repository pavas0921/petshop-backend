import express from "express";
import {
  createCategoryExpense,
  getCategoryByCompany,
} from "../controllers/expensesCategoryController.js";

const router = express.Router();

//create Company
router.post("/", createCategoryExpense);
router.get("/:idCompany", getCategoryByCompany);

export default router;
