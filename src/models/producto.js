import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productDetails: [
    {
      presentacion: String,
      cantidad: Number,
      precioCosto: Number,
      precioVenta: Number,
    },
  ],
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

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;
