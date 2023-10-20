const User = require("../userSchema");
const UserServise = require("./Servises/userServise");

class UserController {
    async getOne (req, res) {
        try{
            const {taskID} = req.params;
            const userID = req.user.id;
            const user = await User.findById(userID);
            const allTasks = [...user.currentTasks, ...user.completedTasks];
            let searchedTask = UserServise.getOne(allTasks, taskID);            
            res.status(200).json(searchedTask)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: e.message})
        }
    };
    async getAll (req, res) {
        try{
            const userID = req.user.id;
            const user = await User.findById(userID);
            const allTasks = [...user.currentTasks, ...user.completedTasks];
            res.status(200).json(allTasks);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message})
        }
    };
    async getCurrent (req, res) {
        try{
            const userID = req.user.id;
            const user = await User.findById(userID);
            const current = user.currentTasks;
            res.status(200).json(current)
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    };
    async getComplete (req, res) {
        try{
            const userID = req.user.id;
            const user = await User.findById(userID);
            const completed = user.completedTasks;
            res.status(200).json(completed)
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    };
    async create (req, res) {
        try{
            const userID = req.user.id;
            const findedUser = await User.findById(userID);
            const task = req.body;
            UserServise.create([...findedUser.currentTasks, ...findedUser.completedTasks], task);
            const user = await User.findByIdAndUpdate(userID, {currentTasks: [task,  ...findedUser.currentTasks]}, {new: true});
            res.status(200).json(user.currentTasks)
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    };
    async replace (req, res) {
        try{
            const userID = req.user.id;
            const {id, replaceType} = req.body;
            const user = await User.findById(userID);
            const updatedData = UserServise.replace(user, replaceType, id);
            const userUpdate = await User.findByIdAndUpdate(
                userID, 
                updatedData,
                {new: true}
            );
            res.status(200).json(updatedData)   
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    };
    async change (req, res) {
        try{
            const userID = req.user.id;
            const newTask = req.body;
            const user = await User.findById(userID);
            const updatedTasks = UserServise.change(user.currentTasks, newTask);
            const updatedUser = await User.findByIdAndUpdate(
                userID, 
                {currentTasks: updatedTasks}
                );
            res.status(200).json(newTask)
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    };
    async delete (req, res) {
        try{
            const {taskID} = req.params;
            const userID = req.user.id;
            const user = await User.findById(userID);
            const update = UserServise.delete(user, taskID);
            const updatedUser = await User.findByIdAndUpdate(userID, update, {new: true});
            res.status(200).json(update)    
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    };
    async getToday (req, res) {
        try {
            const userID = req.user.id;
            const user = await User.findById(userID);
            const tasks = user.currentTasks;
            const resData = tasks.filter(({endPoint}) => {
                return (endPoint - Date.now()) < (1000 * 60 * 60 * 24)
            });
            res.status(200).json(resData)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    };
    async getUrgently (req, res) {
        try {
            const urgentTime = (1000 * 60 * 60 * 24) * 3
            const userID = req.user.id;
            const user = await User.findById(userID);
            const tasks = user.currentTasks;
            const resData = tasks.filter(({endPoint}) => {
                return (endPoint - Date.now()) < urgentTime
            });
            res.status(200).json(resData)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    };
    async getMajor (req, res) {
        try {
            const userID = req.user.id;
            const user = await User.findById(userID);
            const tasks = user.currentTasks;
            const resData = tasks.filter(({prior}) => {
                return prior == 3
            });
            res.status(200).json(resData)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    };
};


module.exports = new UserController