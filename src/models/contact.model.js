const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  label: {
    required: true,
    type: String
  },
  link: {
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
}, { collection: 'contact', timestamps: true })

module.exports = mongoose.model('contact', dataSchema)