import mongoose from "mongoose";

const expensesCategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  idCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const expensesCategory = mongoose.model(
  "expensesCategory",
  expensesCategorySchema
);

export default expensesCategory;
