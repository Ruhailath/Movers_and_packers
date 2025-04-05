const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  providerID: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  bookingDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Canceled'],
    default: 'Pending'
  },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  location: String
});

module.exports = mongoose.model('Booking', bookingSchema);
