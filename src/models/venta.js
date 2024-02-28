import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  detalleVenta: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      productImage: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      unitPrice: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  payMethod:{
    type: String,
    required: true
  }, 
  saleType:{
    type: String,
    required: true
  },
  totalVenta: {
    type: Number,
    required: true,
  },
});

const Venta = mongoose.model("Venta", ventaSchema);

export default Venta;
