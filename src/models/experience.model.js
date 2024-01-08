const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  company: {
    required: true,
    type: String
  },
  from: {
    required: true,
    type: Number
  },
  to: {
    required: true,
    type: Number
  },
  role: {
    required: true,
    type: String
  },
  order: {
    required: true,
    type: Number
  },
  link: {
    required: true,
    type: String
  },
}, { collection: 'experience', timestamps: true })

module.exports = mongoose.model('experience', dataSchema)