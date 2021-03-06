const express = require('express');
const router = express.Router();

const { validateUser, validateExercise } = require('../models/User');

const {
  createUser,
  addExercise,
  getUserExercises,
  getAllUsers
} = require('../controllers/userController');

const catchErrors = require('../middleware/catchErrors');
const validateRequest = require('../middleware/validateRequest');
const validateId = require('../middleware/validateId');

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
router.get('/log', validateId, catchErrors(getUserExercises));
router.get('/users', catchErrors(getAllUsers));

module.exports = router;
