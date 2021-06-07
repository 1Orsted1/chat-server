const express = require("express");
const messageController = require("../controllers/messageController.js");

const api = express.Router();

api.post("/new-message-container", messageController.newMessageContainer);
api.get("/messages", messageController.getMessages);
api.post("/update-messages", messageController.addMessage);

module.exports = api;
