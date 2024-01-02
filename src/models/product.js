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
  idEspecie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Especie",
  },
  idCategoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
  },
  idBusinessCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "businessCategory",
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
});

const product = mongoose.model("product", productsSchema);

export default product;
