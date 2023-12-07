import mongoose from "mongoose";

const businessCategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const businessCategory = mongoose.model("businessCategory", businessCategorySchema);

export default businessCategory;
