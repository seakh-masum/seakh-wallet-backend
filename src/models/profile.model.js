const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  role: {
    required: true,
    type: String
  },
  image: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: Array,
  },
  order: {
    required: true,
    type: Number
  },
}, { collection: 'profile', timestamps: true })

module.exports = mongoose.model('profile', dataSchema)