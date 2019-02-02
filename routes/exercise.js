const express = require('express');
const router = express.Router();

const {
  createUser,
  addExercise,
  getUserExercises
} = require('../controllers/exerciseController');

const catchErrors = require('../middleware/catchErrors');

router.post('/new-user', catchErrors(createUser));
router.post('/add', catchErrors(addExercise));
router.get('/log', catchErrors(getUserExercises));

module.exports = router;
