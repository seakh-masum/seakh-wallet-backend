const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  course: {
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
  institute: {
    required: true,
    type: String
  },
  order: {
    required: true,
    type: Number
  },
  marks: {
    required: true,
    type: Number
  },
}, { collection: 'education', timestamps: true })

module.exports = mongoose.model('education', dataSchema)