const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  label: {
    required: true,
    type: String
  },
  color: {
    required: true,
    type: String
  },
  icon: {
    required: true,
    type: String
  },
  order: {
    required: true,
    type: Number
  },
}, { collection: 'hobby', timestamps: true })

module.exports = mongoose.model('hobby', dataSchema)