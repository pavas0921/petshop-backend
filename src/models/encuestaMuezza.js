import mongoose from "mongoose";

const encuestaMuezzaSchema = new mongoose.Schema({
  fullName: {
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
  petsQty: {
    type: Number,
    required: true,
  },
  diases: {
    type: String,
    required: true,
  },
  food: {
    type: String,
    required: true,
  },
  nutritionalRequirements: {
    type: String,
    required: true,
  },
  vaccination: {
    type: String,
    required: true,
  },
  redeemedDiscount:{
    type: Boolean,
    required: true
  }

});

const encuestaMuezza = mongoose.model("encuestaMuezza", encuestaMuezzaSchema);

export default encuestaMuezza;
