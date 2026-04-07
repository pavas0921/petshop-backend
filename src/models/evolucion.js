import mongoose from 'mongoose';

const evolucionSchema = new mongoose.Schema(
  {
    fecha: { type: Date, required: [true, 'La fecha es obligatoria'] },
    hora: { type: String, trim: true },
    observaciones: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Evolucion', evolucionSchema);