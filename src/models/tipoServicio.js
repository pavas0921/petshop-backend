import mongoose from 'mongoose';

const tipoServicioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del servicio es obligatorio'],
      trim: true,
      unique: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('TipoServicio', tipoServicioSchema);