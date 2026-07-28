const mongoose = require('mongoose');

const anexoSchema = new mongoose.Schema(
  {
    nombre: { type: String, trim: true },
    url: { type: String, trim: true },
    tipo: {
      type: String,
      enum: ['imagen', 'pdf', 'laboratorio', 'radiografia', 'ecografia', 'otro'],
      default: 'otro',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Anexo', anexoSchema);