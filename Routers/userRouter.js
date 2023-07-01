const express = require("express");
const Router = new express.Router();
const User = require("../userSchema");
const userController = require("../Controllers/userController");

// put userID in query params, taskID in headers.
Router.get("/one/:userID/:taskID", userController.getOne);


Router.get("/all/:userID", userController.getAll);
Router.get("/current/:userID", userController.getCurrent);
Router.get("/complete/:userID", userController.getComplete);

Router.put("/create/:userID", userController.create);

Router.put("/replace/:userID", userController.replace);
Router.put("/change/:userID", userController.change);

Router.put("/delete/:userID", userController.delete)


module.exports = Router;

// GET METHOD
// getOne
// getAll
// getCurrent
// getComplete


// POST METHOD
// createTask

// PUT METHOD
// Replace
// Change

// DELETE METHOD
// delete


// Router.get("/", async (req, res) => {
//     try{
//         const user = await User.create({
//             username: "testname",
//             password: "testpassword",
//             role: "USER",
//             currrentTasks: [{"task1": "task1"}],
//             completedTasks: [{"task1": "task1"}]
//         });
//         await user.save();
//     } catch (e) {
//         console.log(e)
//     }
//     res.status(200).json("get req is working!")
// });








