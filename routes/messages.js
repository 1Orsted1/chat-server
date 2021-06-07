const express = require("express");
const messageController = require("../controllers/messageController.js");

const api = express.Router();

api.post("/new-message-container", messageController.newMessageContainer);
api.get("/messages", messageController.getMessages);

module.exports = api;
