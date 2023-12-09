const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  amount: {
    required: true,
    type: Number
  },
  category: {
    required: true,
    type: String
  },
  fromAccount: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  type: {
    required: true,
    type: Number
  },
}, { timestamps: true })

module.exports = mongoose.model('Transaction', dataSchema)