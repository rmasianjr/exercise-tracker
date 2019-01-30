const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  description: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  log: [exerciseSchema]
});

module.exports = mongoose.model('User', userSchema);
