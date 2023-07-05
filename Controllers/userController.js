const User = require("../userSchema");
const UserServise = require("./Servises/userServise");

class UserController {
    async getOne (req, res) {
        try{
            const {userID} = req.params;
            const taskID = req.body.id;
            if (!userID) {
                res.status(400).json({message: "add userID to the query params"})
            };
            const user = await User.findById(userID);
            const allTasks = [...user.currentTasks, ...user.completedTasks];
            let searchedTask = UserServise.getOne(allTasks, taskID);            
            res.status(200).json(searchedTask)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message})
        }
    };
    async getAll (req, res) {
        try{
            const {userID} = req.params;
            if(!userID) {
                res.status(400).json({message: "add user id to the query params"})
            };
            const user = await User.findById(userID);
            const allTasks = [...user.currentTasks, ...user.completedTasks];
            if ( allTasks.length < 1 ) {
                throw new Error("user have no one task")
            };
            res.status(200).json(allTasks);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message})
        }
    };
    async getCurrent (req, res) {
        try{
            const {userID} = req.params;
            if(!userID) {
                res.status(400).json({message: "add user id to the query params"})
            };
            const user = await User.findById(userID);
            const current = user.currentTasks;
            res.status(200).json(current)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message})
        }
    };
    async getComplete (req, res) {
        try{
            const {userID} = req.params;
            if(!userID) {
                res.status(400).json({message: "add user id to the query params"})
            };
            const user = await User.findById(userID);
            const completed = user.completedTasks;
            res.status(200).json(completed)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message})
        }
    };
    async create (req, res) {
        try{
            const {userID} = req.params;
            const task = req.body;
            if(!userID) {
                res.status(400).json({message: "add user id to the query params"})
            };
            const findedUser = await User.findById(userID);
            const checker = UserServise.create([...findedUser.currentTasks, ...findedUser.completedTasks], task);
                if (checker) {
                    res.status(400).json({message: "task with same id is already have"})
                    return
                };
            const user = await User.findByIdAndUpdate(userID, {currentTasks: [task,  ...findedUser.currentTasks]}, {new: true});
            res.status(200).json(user.currentTasks)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message})
        }
    };
    async replace (req, res) {
        try{
            const {userID} = req.params;
                if(!userID) {
                    res.status(400).json({message: "add user id to the query params"})
                };
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
            console.log(e);
            res.status(400).json({message: e.message})
        }
    };
    async change (req, res) {
        try{
            const {userID} = req.params;
            if(!userID) {
                res.status(400).json({message: "add user id to the query params"})
            };
            const newTask = req.body;
            const user = await User.findById(userID);
            const updatedTasks = UserServise.change(user.currentTasks, newTask);
            const updatedUser = await User.findByIdAndUpdate(userID, {
                currentTasks: updatedTasks
            });
            res.status(200).json(newTask)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message})
        }
    };
    async delete (req, res) {
        try{
            const {userID} = req.params;
            if(!userID) {
                res.status(400).json({message: "add user id to the query params"})
            };
            const {id} = req.body;
            const user = await User.findById(userID);
            const update = UserServise.delete(user, id);
            const updatedUser = await User.findByIdAndUpdate(userID, update, {new: true});
            res.status(200).json(update)    
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message})
        }
    }
};


module.exports = new UserController