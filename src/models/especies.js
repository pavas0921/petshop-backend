import mongoose from "mongoose";

const especieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  idCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

const Especie = mongoose.model("Especie", especieSchema);

export default Especie;
