const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  providerID: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  serviceName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Service', serviceSchema);
