const express = require("express");
const roomController = require("../controllers/roomController.js");

const api = express.Router();

api.post("/new-room", roomController.newRoom);
api.get("/room", roomController.getRoom);
api.get("/rooms", roomController.getAllRooms);

module.exports = api;
