const express = require("express");
const groupController = require("../controllers/groupController.js") 

const api = express.Router();

api.post("/new-group", groupController.newGroup);
api.get("/my-grups", groupController.getMyGroups);
api.get("/my-own-grups", groupController.getMyOwnGroups);

module.exports = api;
