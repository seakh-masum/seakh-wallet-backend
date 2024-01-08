const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  color: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  experience: {
    required: true,
    type: Number
  },
  features: {
    required: true,
    type: Array
  },
  icon: {
    required: true,
    type: String
  },
  level: {
    required: true,
    type: String
  },
  link: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  order: {
    required: true,
    type: Number
  },
  projects: {
    required: true,
    type: Array
  },
  value: {
    required: true,
    type: Number
  },
}, { collection: 'skill', timestamps: true })

module.exports = mongoose.model('skill', dataSchema)