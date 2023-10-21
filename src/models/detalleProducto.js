import mongoose from "mongoose";

const detalleProductoSchema = new mongoose.Schema({
  presentacion: {
    type: String,
    required: true,
  },
  porcentajeUtilidad: {
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
  porcentajeUtilidad: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  idProducto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
});

const DetalleProducto = mongoose.model(
  "DetalleProducto",
  detalleProductoSchema
);

export default DetalleProducto;
