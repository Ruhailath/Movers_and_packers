const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  serviceType: String,
  location: String,
  ratings: [Number]
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
