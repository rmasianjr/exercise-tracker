const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/exerciseController');

const catchErrors = require('../middleware/catchErrors');

router.post('/new-user', catchErrors(createUser));

module.exports = router;
