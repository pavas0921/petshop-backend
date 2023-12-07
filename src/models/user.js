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
  id: {
    type: String,
    required: true,
    unique: true
  }, 
  password: {
    type: String,
    required: true,
  },
  rolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rol",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
