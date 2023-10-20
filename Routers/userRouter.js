const express = require("express");
const Router = new express.Router();
const User = require("../userSchema");
const userController = require("../Controllers/userController");
const authMiddleware = require("../myMiddlewares/authMiddleware");
const roleMiddleware = require("../myMiddlewares/roleMiddleware")


Router.get("/one/:taskID", [authMiddleware, roleMiddleware(["USER"])], userController.getOne);

Router.get("/all", [authMiddleware, roleMiddleware(["USER"])], userController.getAll);
Router.get("/current", [authMiddleware, roleMiddleware(["USER"])], userController.getCurrent);
Router.get("/complete", [authMiddleware, roleMiddleware(["USER"])], userController.getComplete);
Router.get("/today", [authMiddleware, roleMiddleware(["USER"])], userController.getToday);
Router.get("/urgently", [authMiddleware, roleMiddleware(["USER"])], userController.getUrgently);
Router.get("/major", [authMiddleware, roleMiddleware(["USER"])], userController.getMajor);



Router.post("/create", [authMiddleware, roleMiddleware(["USER"])], userController.create);

Router.put("/replace", [authMiddleware, roleMiddleware(["USER"])], userController.replace);
Router.put("/change", [authMiddleware, roleMiddleware(["USER"])], userController.change);

Router.delete("/delete/:taskID", [authMiddleware, roleMiddleware(["USER"])], userController.delete)


module.exports = Router;








