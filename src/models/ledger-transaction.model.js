const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  amount: {
    required: true,
    type: Number
  },
  customerId: {
    required: true,
    type: String
  },
  details: {
    required: true,
    type: String
  },
}, { timestamps: true })

module.exports = mongoose.model('Ledger-Transaction', dataSchema)