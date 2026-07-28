import mongoose from 'mongoose';

const examenFisicoSchema = new mongoose.Schema(
  {
    condicionCorporal: {
      type: Number,
      min: [1, 'Mínimo 1'],
      max: [5, 'Máximo 5'],
      default: null,
    },
    temperatura: { type: Number, default: null },         // °C
    fc: { type: Number, default: null },                  // L/min
    fr: { type: Number, default: null },                  // R/min
    tllc: { type: Number, default: null },                // seg
    trpc: { type: Number, default: null },                // seg
    pulso: { type: String, trim: true },
    mucosas: { type: String, trim: true },
    porcentajeDeshidratacion: { type: Number, default: null },
    organosDeLossentidos: { type: String, trim: true },
    pielYPelaje: { type: String, trim: true },
    gangliosLinfaticos: { type: String, trim: true },
    sistemaDigestivo: { type: String, trim: true },
    sistemaRespiratorio: { type: String, trim: true },
    sistemaEndocrino: { type: String, trim: true },
    sistemaMusculoEsqueletico: { type: String, trim: true },
    sistemaNervioso: { type: String, trim: true },
    sistemaUrinario: { type: String, trim: true },
    sistemaReproductivo: { type: String, trim: true },
    palpacionRectal: { type: String, trim: true },
    otros: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('ExamenFisico', examenFisicoSchema);