const mongoose = require('mongoose');

const paymentItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'PLease provide Payment Item name'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'PLease provide Payment Item amount'],
  },
  currency: {
    type: String,
    required: [true, 'PLease provide Payment Item currency'],
  },
  principalId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'PLease provide principal ID'],
    ref: 'User'
  }
});

module.exports = mongoose.model('PaymentItem', paymentItemSchema);