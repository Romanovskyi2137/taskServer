const express = require("express");
const Router = new express.Router();
const User = require("../userSchema");
const userController = require("../Controllers/userController");
const authMiddleware = require("../myMiddlewares/authMiddleware");
const roleMiddleware = require("../myMiddlewares/roleMiddleware")


Router.get("/one/:userID", [authMiddleware, roleMiddleware(["USER"])], userController.getOne);

Router.get("/all/:userID", [authMiddleware, roleMiddleware(["USER"])], userController.getAll);
Router.get("/current/:userID", [authMiddleware, roleMiddleware(["USER"])], userController.getCurrent);
Router.get("/complete/:userID", [authMiddleware, roleMiddleware(["USER"])], userController.getComplete);

Router.post("/create/:userID", [authMiddleware, roleMiddleware(["USER"])], userController.create);

Router.put("/replace/:userID", [authMiddleware, roleMiddleware(["USER"])], userController.replace);
Router.put("/change/:userID", [authMiddleware, roleMiddleware(["USER"])], userController.change);

Router.delete("/delete/:userID", [authMiddleware, roleMiddleware(["USER"])], userController.delete)


module.exports = Router;








