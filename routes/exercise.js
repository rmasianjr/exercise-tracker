const express = require('express');
const router = express.Router();

const { validateUser, validateExercise } = require('../models/User');

const {
  createUser,
  addExercise,
  getUserExercises
} = require('../controllers/exerciseController');

const catchErrors = require('../middleware/catchErrors');
const validateRequest = require('../middleware/validateRequest');

router.post(
  '/new-user',
  validateRequest(validateUser),
  catchErrors(createUser)
);
router.post(
  '/add',
  validateRequest(validateExercise),
  catchErrors(addExercise)
);
router.get('/log', catchErrors(getUserExercises));

module.exports = router;
