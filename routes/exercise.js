const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/exerciseController');

router.post('/new-user', createUser);

module.exports = router;
