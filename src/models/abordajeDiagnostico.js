import mongoose from 'mongoose';

const abordajeDiagnosticoSchema = new mongoose.Schema(
  {
    listaProblemas: [{ type: String, trim: true }],
    listaMaestra: [{ type: String, trim: true }],
    diagnosticosDiferenciales: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default mongoose.model('AbordajeDiagnostico', abordajeDiagnosticoSchema);