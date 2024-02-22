import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  detalleVenta: [
    {
      detalleProducto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DetalleProducto",
        required: true,
      },
      nombreProducto: {
        type: String,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
      precioUnitario: {
        type: Number,
        required: true,
      },
      precioTotal: {
        type: Number,
        required: true,
      },
    },
  ],
  totalVenta: {
    type: Number,
    required: true,
  },
});

const Venta = mongoose.model("Venta", ventaSchema);

export default Venta;
