import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  numeroDocumento: {
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
  idCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

});

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;
