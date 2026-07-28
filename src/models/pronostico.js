import mongoose from 'mongoose';

const pronosticoSchema = new mongoose.Schema(
  {
    pronostico: {
      type: String,
      enum: ['favorable', 'reservado', 'grave', 'muerte'],
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Pronostico', pronosticoSchema);