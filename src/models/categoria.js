import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
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

const Categoria = mongoose.model("Categoria", categoriaSchema);

export default Categoria;
