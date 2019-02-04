const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
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


function validateUser(user) {
  const schema = Joi.object().keys({
    username: Joi.string().min(5).max(50).required()
  });

  return Joi.validate(user, schema);
}

function validateExercise(exercise) {
  const schema = Joi.object().keys({
    userId: Joi.objectId().required().error(() => "Invalid userId"),
    description: Joi.string().max(50).required(),
    duration: Joi.number().min(1).required(),
    date: Joi.date().min('now').allow('').iso()
  });

  return Joi.validate(exercise, schema);
}

exports.validateUser = validateUser;
exports.validateExercise = validateExercise;
exports.User = mongoose.model('User', userSchema);
