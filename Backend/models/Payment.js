const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Credit Card', 'Cash', 'UPI', 'PayPal'] },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' }
});

module.exports = mongoose.model('Payment', paymentSchema);
