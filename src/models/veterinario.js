import mongoose from 'mongoose';

const veterinarioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es obligatorio'],
      unique: true,
    },
    tarjetaProfesional: {
      type: String,
      required: [true, 'La tarjeta profesional es obligatoria'],
      trim: true,
      unique: true,
    },
    especialidad: {
      type: String,
      trim: true,
    },
    firma: {
      type: String, // URL de la imagen de la firma
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Veterinario', veterinarioSchema);