import mongoose from "mongoose";

const petProductsSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  barCode: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
  precioCosto: {
    type: Number,
    required: true,
  },
  precioVenta: {
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
});

const petProducts = mongoose.model("petProducts", petProductsSchema);

export default petProducts;
