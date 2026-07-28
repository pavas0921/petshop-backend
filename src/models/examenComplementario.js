import mongoose from 'mongoose';

const examenComplementarioSchema = new mongoose.Schema(
  {
    fechaOrden: { type: Date, default: null },
    examen: { type: String, trim: true },
    resultado: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('ExamenComplementario', examenComplementarioSchema);