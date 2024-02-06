import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  cedula: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },  
  comments: {
    type: String,
  },
  idCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
