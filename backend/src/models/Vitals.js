const mongoose = require('mongoose');

const vitalsSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deviceId: { type: String }, // Wearable device identifier
  heartRate: { type: Number },
  bloodPressureSys: { type: Number },
  bloodPressureDia: { type: Number },
  spO2: { type: Number },
  temperature: { type: Number },
  isAnomaly: { type: Boolean, default: false }, // Flagged by AI
  anomalyType: { type: String }, // e.g., "Tachycardia", "Hypoxia"
}, {
  timestamps: true
});

// Time-series indexing for fast retrieval
vitalsSchema.index({ patientId: 1, createdAt: -1 });

const Vitals = mongoose.model('Vitals', vitalsSchema);
module.exports = Vitals;
