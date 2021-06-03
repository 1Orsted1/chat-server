const express = require("express")
const usersController = require("../controllers/usersController")

const api = express.Router();

api.post("/add-user", usersController.addUser);
api.post("/get-user", usersController.searchUser);

module.exports = api;
