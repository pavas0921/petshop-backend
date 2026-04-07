import mongoose from 'mongoose';

const anamnesisSchema = new mongoose.Schema(
  {
    dieta: { type: String, trim: true },
    enfermedadesPrevias: { type: String, trim: true },
    esterilizado: { type: Boolean, default: null },
    cirugiasPrevias: { type: String, trim: true },
    esquemaVacunal: { type: String, trim: true },
    fechaUltimaDesparasitacion: { type: Date, default: null },
    productoUltimaDesparasitacion: { type: String, trim: true },
    tratamientosRecientes: { type: String, trim: true },
    viajesRecientes: { type: String, trim: true },
    viveConOtrosAnimales: { type: Boolean, default: null },
    cualesAnimales: { type: String, trim: true },
    comportamiento: { type: String, trim: true },
    motivoConsulta: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Anamnesis', anamnesisSchema);