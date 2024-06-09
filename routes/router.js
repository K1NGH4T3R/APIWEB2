const express = require('express');
const activityController = require('../controllers/activityController');
const artifactController = require('../controllers/artifactController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authToken = require('../middleware/auth');

const router = express.Router();

module.exports = router;