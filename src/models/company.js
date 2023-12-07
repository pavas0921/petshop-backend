import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "businessCategory",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  responsibleName: {
    type: String,
    required: true,
  },  
  responsibleId: {
    type: String,
    required: true,
  },
  responsibleEmail: {
    type: String,
    required: true,
  },
  responsiblePhone: {
    type: String,
    required: true,
  },
  nit: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  }, 
});

const Company = mongoose.model("Company", companySchema);

export default Company;
