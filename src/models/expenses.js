import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "expensesCategory",
  },
  cost: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  idSupplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  idCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

const Expenses = mongoose.model("expenses", expensesSchema);

export default Expenses;
