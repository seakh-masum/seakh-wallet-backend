const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  balance: {
    required: true,
    type: Number
  }
}, { timestamps: true })

module.exports = mongoose.model('Ledger-Customer', dataSchema)