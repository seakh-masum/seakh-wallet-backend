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
  desc: {
    required: true,
    type: String
  },
  order: {
    required: true,
    type: Number
  },
}, { collection: 'project', timestamps: true })

module.exports = mongoose.model('project', dataSchema)