const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  providerID: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
