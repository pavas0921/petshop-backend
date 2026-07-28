import mongoose from "mongoose";

const dataSheetSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bornDate: {
    type: Date,
    required: true,
  },  
  color: {
    type: String,
    required: true
  },
  coatType: {
    type: String,
    required: true
  },
  coatType: {
    type: String,
  },
  particularSigns: {
    type: String,
  },
  origin: {
    type: String,
  },
  idCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  idOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },

});

const dataSheet = mongoose.model("DataSheet", dataSheetSchema);

export default dataSheet;
