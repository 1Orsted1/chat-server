const express = require("express")
const usersController = require("../controllers/usersController")

const api = express.Router();

api.post("/add-user", usersController.addUser);
api.get("/get-user", usersController.searchUser);

module.exports = api;
