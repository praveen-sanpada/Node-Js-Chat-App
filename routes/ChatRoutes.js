// routes/ChatRoutes.js
const express = require('express');
const ChatController = require('../controllers/ChatController');

module.exports = (io) => {
    const router = express.Router();

    router.post('/add_user', (req, res) => ChatController.createUser(req, res, io));
    router.post('/get_user', (req, res) => ChatController.getUserById(req, res, io));
    router.post('/add_message', (req, res) => ChatController.createMessage(req, res, io));

    return router;
};
