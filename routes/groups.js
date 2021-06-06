const express = require("express");
const groupController = require("../controllers/groupController.js") 

const api = express.Router();

api.post("/new-group", groupController.newGroup);

module.exports = api;
