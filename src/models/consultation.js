import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema(
  {
    clinicalRecord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClinicalRecord',
      required: [true, 'La historia clínica es obligatoria'],
    },
    fechaConsulta: {
      type: Date,
      default: Date.now,
    },
    veterinario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Veterinario',
      default: null,
    },
    tipoServicio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TipoServicio',
      default: null,
    },

    // Datos que se actualizan en cada visita
    peso: {
      type: Number,
      min: [0, 'El peso no puede ser negativo'],
      default: null,
    },

    // Secciones 1:1 por consulta
    anamnesis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anamnesis',
      default: null,
    },
    examenFisico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExamenFisico',
      default: null,
    },
    abordajeDiagnostico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AbordajeDiagnostico',
      default: null,
    },

    // Diagnósticos y plan
    diagnostico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Diagnostico',
      default: null,
    },  
    planTerapeutico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlanTerapeutico',
      default: null,
    },
    pronostico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pronostico',
      default: null,
    },

    vacunaciones: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Vacunacion' },
    ],
    desparasitaciones: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Desparasitacion' },
    ],
    

    // Secciones 1:N por consulta (arreglo de referencias)
    examenesComplementarios: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'ExamenComplementario' },
    ],
    evoluciones: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Evolucion' },
    ],
    anexos: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Anexo' },
    ],

    observaciones: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Consultation', consultationSchema);