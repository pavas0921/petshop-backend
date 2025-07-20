import mongoose from "mongoose";

const historyClinicalSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DataSheet',
    required: true
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
  anamnesis: {
    type: String,
    required: true,
  },
  examenClinico: {
   type: String,
   required: true,
  },
  evaluacionPorSistemas: {
    type: String,
    required: true,
  },
  diagnostico: {
    type: String,
    required: true,
  },
  examenesComplementarios: {
    type: String
  },
  planTerapeutico: {
    type: String
  },
  pronostico: String,
  evolucion: [
    {
      fecha: { type: Date, default: Date.now },
      nota: String,
    }
  ],
  observaciones: String,
  anexos: [String],
  idCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

const historyClinical = mongoose.model("HistoryClinical", historyClinicalSchema);

export default historyClinical;

