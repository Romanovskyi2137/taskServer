const express = require("express");
const Router = new express.Router();
const authController = require("../Controllers/authController");
const {check} = require("express-validator");
const authMiddleware = require("../myMiddlewares/authMiddleware");
const roleMiddleware = require("../myMiddlewares/roleMiddleware")



Router.post("/registration", [
    check("username", "username can`t be empty").notEmpty(),
    check("password", "password will be from 6 to 12 symbs").isLength({min: 6, max: 12})
],authController.registration);
Router.post("/login", authController.login);
Router.post("/google_login", authController.google_login);


Router.get("/test", [authMiddleware, roleMiddleware(["ADMIN"])],authController.test);

module.exports = Router;