import mongoose from 'mongoose';

const clinicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'El paciente es obligatorio'],
      unique: true, // un paciente, una sola historia clínica
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
      required: [true, 'El propietario es obligatorio'],
    },
    // Las consultas se acceden desde el modelo Consultation
    // filtrando por clinicalRecord: ObjectId
  },
  { timestamps: true }
);

export default mongoose.model('ClinicalRecord', clinicalRecordSchema);