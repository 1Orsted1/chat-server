const express = require("express");
const AuthController = require("../controllers/auth.js");

const api = express.Router();

api.post("/refresh-access-token", AuthController.refreshAccessToken);

module.exports = api;
