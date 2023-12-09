const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  details: {
    required: true,
    type: String
  },
  color: {
    required: true,
    type: String
  },
}, { collection: 'doc', timestamps: true })

module.exports = mongoose.model('doc', dataSchema)