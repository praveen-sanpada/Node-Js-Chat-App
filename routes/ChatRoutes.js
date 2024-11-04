// routes/ChatRoutes.js
const express = require('express');
const ChatController = require('../controllers/ChatController');
const router = express.Router();

router.post('/add_user', ChatController.createUser);

module.exports = router;
