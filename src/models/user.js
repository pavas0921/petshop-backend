import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rol",
      required: true,
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
