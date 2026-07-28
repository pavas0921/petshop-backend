import mongoose from 'mongoose';

const vacunacionSchema = new mongoose.Schema(
  {
    fecha: {
      type: Date,
      required: [true, 'La fecha es obligatoria'],
    },
    descripcion: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Vacunacion', vacunacionSchema);