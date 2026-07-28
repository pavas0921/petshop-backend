import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      enum: ['propietario', 'responsable'],
      required: [true, 'El tipo (propietario/responsable) es obligatorio'],
    },
    nombres: {
      type: String,
      required: [true, 'Los nombres son obligatorios'],
      trim: true,
    },
    apellidos: {
      type: String,
      required: [true, 'Los apellidos son obligatorios'],
      trim: true,
    },
    tipoDocumento: {
      type: String,
      enum: ['CC', 'CE', 'PA', 'NIT', 'TI', 'RC'],
      required: [true, 'El tipo de documento es obligatorio'],
    },
    numeroDocumento: {
      type: String,
      required: [true, 'El número de documento es obligatorio'],
      trim: true,
      unique: true,
    },
    direccion: {
      type: String,
      required: [true, 'La dirección es obligatoria'],
      trim: true,
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
      trim: true,
    },
    correo: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Formato de correo inválido'],
    },
  },
  { timestamps: true }
);

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;
