import mongoose from "mongoose";

const petProductsSchema = new mongoose.Schema({
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
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }

});

const petProducts = mongoose.model("petProducts", petProductsSchema);

export default petProducts;
