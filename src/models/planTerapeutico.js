import mongoose from 'mongoose';

const planTerapeuticoSchema = new mongoose.Schema(
  {
    plan: { type: String, trim: true },
    formulaMedica: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('PlanTerapeutico', planTerapeuticoSchema);