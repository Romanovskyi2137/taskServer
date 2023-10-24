const User = require("../userSchema");
const UserServise = require("./Servises/userServise");

class UserController {
    async getOne (req, res) {
        try{
            const {taskID} = req.params;
            const userID = req.user.id;
            const searchedTask = await UserServise.getOne(userID, taskID);         
            res.status(200).json(searchedTask)
        } catch (e) {
            res.status(400).json({message: e.message || e})
        }
    };
    async getAll (req, res) {
        try{
            const userID = req.user.id;
            const allTasks = await UserServise.getAll(userID)
            res.status(200).json(allTasks);
        } catch (e) {
            res.status(400).json({message: e.message || e})
        }
    };
    async getCurrent (req, res) {
        try{
            const userID = req.user.id;
            const current = await UserServise.getCurrent(userID);
            res.status(200).json(current)
        } catch (e) {
            res.status(400).json({message: e.message || e})
        }
    };
    async getComplete (req, res) {
        try{
            const userID = req.user.id;
            const completed = await UserServise.getComplete(userID);
            res.status(200).json(completed)
        } catch (e) {
            res.status(400).json({message: e.message || e})
        }
    };
    async create (req, res) {
        try{
            const userID = req.user.id;
            const task = req.body;
            const response = await UserServise.create(userID, task)
            res.status(200).json(task)
        } catch (e) {
            res.status(400).json({message: e.message || e})
        }
    };
    async replace (req, res) {
        try{
            const userID = req.user.id;
            const {id: taskID, replaceType} = req.body;
            const update = await UserServise.replace(userID, replaceType, taskID)
            res.status(200).json({message: "succsess!", update})   
        } catch (e) {
            res.status(400).json({message: e.message || e})
        }
    };
    async change (req, res) {
        try{
            const userID = req.user.id;
            const newTask = req.body;
            const updatedTask = await UserServise.change(userID, newTask);
            res.status(200).json(updatedTask)
        } catch (e) {
            res.status(400).json({message: e.message || e})
        }
    };
    async delete (req, res) {
        try{
            const {taskID} = req.params;
            const userID = req.user.id;
            const update = await UserServise.delete(userID, taskID);
            res.status(200).json(update)    
        } catch (e) {
            res.status(400).json({message: e.message || e})
        }
    };
    async getToday (req, res) {
        try {
            const userID = req.user.id;
            const resData = await UserServise.getToday(userID)
            res.status(200).json(resData)
        } catch (e) {
            res.status(400).json({message: e.message || e})
        }
    };
    async getUrgently (req, res) {
        try {
            const userID = req.user.id;
            const resData = await UserServise.getUrgently(userID)
            res.status(200).json(resData)
        } catch (e) {
            res.status(400).json({message: e.message || e})
        }
    };
    async getMajor (req, res) {
        try {
            const userID = req.user.id;
            const resData = await UserServise.getMajor(userID);
            res.status(200).json(resData)
        } catch (e) {
            res.status(400).json({message: e.message || e})
        }
    };
};


module.exports = new UserController