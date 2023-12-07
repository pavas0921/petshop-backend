import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
      },
      petProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "petProducts",
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
      stock: {
        type: Number,
        required: true,
      },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
