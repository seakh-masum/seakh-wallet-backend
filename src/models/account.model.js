const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  balance: {
    required: true,
    type: Number
  },
  color: {
    required: true,
    type: String
  },
  accountNo: {
    type: Number
  },
  branch: {
    type: String
  },
  holderName: {
    type: String
  },
  ifsc: {
    type: String
  },
}, { timestamps: true })

module.exports = mongoose.model('Account', dataSchema)