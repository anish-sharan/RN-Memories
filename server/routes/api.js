const express = require('express');
const router = express.Router();

const { registerUser, signInUser } = require('../controller/userController');
const { addMemory } = require('../controller/memoryController');

router.post('/signup', registerUser);
router.post('/signin', signInUser);

router.post('/memory', addMemory);

module.exports = router;
