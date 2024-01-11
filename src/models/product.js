import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  barCode: {
    type: String,
  },
  image: {
    type: String,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  idEspecie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Especie",
    required: true,
  },
  idCategoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  idCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const product = mongoose.model("product", productsSchema);

export default product;
