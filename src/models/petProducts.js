import mongoose from "mongoose";

const petProductsSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  barCode: {
    type: String,
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
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }

});

const petProducts = mongoose.model("petProducts", petProductsSchema);

export default petProducts;
