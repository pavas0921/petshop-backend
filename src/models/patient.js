import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
      required: [true, 'El propietario es obligatorio'],
    },
    nombrePaciente: {
      type: String,
      required: [true, 'El nombre del paciente es obligatorio'],
      trim: true,
    },
    especie: {
      type: String,
      required: [true, 'La especie es obligatoria'],
      trim: true,
    },
    raza: {
      type: String,
      required: [true, 'La raza es obligatoria'],
      trim: true,
    },
    sexo: {
      type: String,
      enum: ['macho', 'hembra'],
      required: [true, 'El sexo es obligatorio'],
    },
    fechaNacimiento: {
      type: Date,
      required: [true, 'La fecha de nacimiento es obligatoria'],
    },
    color: {
      type: String,
      required: [true, 'El color es obligatorio'],
      trim: true,
    },
    tipoPelaje: {
      type: String,
      required: [true, 'El tipo de pelaje es obligatorio'],
      trim: true,
    },
    chip: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Patient', patientSchema);