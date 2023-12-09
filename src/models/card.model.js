const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  cardName: {
    required: true,
    type: String
  },
  cardNo: {
    required: true,
    type: Number
  },
  type: {
    required: true,
    type: Number
  },
  color: {
    required: true,
    type: String
  },
  cvv: {
    required: true,
    type: Number
  },
  holderName: {
    type: String
  },
  expiryMonth: {
    required: true,
    type: Number
  },
  expiryYear: {
    required: true,
    type: Number
  },
  network: {
    required: true,
    type: Number
  },
}, { timestamps: true });

dataSchema.index({ title: 'text' })

module.exports = mongoose.model('Card', dataSchema)