const express = require("express");
const ThemeController = require("../controllers/newTheme.js");

const api = express.Router();

api.post("/add-theme",ThemeController.newOne);
api.get("/themes", ThemeController.getThemes);

module.exports = api;
