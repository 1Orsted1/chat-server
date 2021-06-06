const express = require("express");
const roomController = require("../controllers/roomController.js") 

const api = express.Router();

api.post("/new-room", roomController.newRoom);

module.exports = api;
