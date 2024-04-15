import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  nit: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  commercialAdvisor: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  idCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
