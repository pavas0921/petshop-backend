import mongoose from 'mongoose';

const diagnosticoSchema = new mongoose.Schema(
  {
    presuntivo: [{ type: String, trim: true }],
    definitivo: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default mongoose.model('Diagnostico', diagnosticoSchema);