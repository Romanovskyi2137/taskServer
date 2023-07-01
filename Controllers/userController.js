const User = require("../userSchema");
const UserServise = require("./Servises/userServise");

class UserController {
    async getOne (req, res) {
        try{
            const {userID, taskID} = req.params;
            console.log(req.params)
            if (!userID) {
                res.status(400).json({message: "add userID to the query params"})
            };
            const user = await User.findById(userID);
            const allTasks = [...user.currentTasks, ...user.completedTasks];
            if (allTasks.length < 1) {
                throw new Error("user have no one task")
            };
            let searchedTask = UserServise.getOne(allTasks, taskID);            
            res.status(200).json(searchedTask)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: ""})
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
            res.status(400).json({message: ""})
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
            res.status(400).json({message: ""})
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
            res.status(400).json({message: "", e})
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
            [...findedUser.currentTasks, ...findedUser.completedTasks ].forEach(t => {
                if (task.id == t.id) {
                    res.status(400).json({message: "task with same id is already have"})
                    return
                }
            });
            const user = await User.findByIdAndUpdate(userID, {currentTasks: [task,  ...findedUser.currentTasks]}, {new: true});
            res.status(200).json(user.currentTasks)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: ""})
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
            let replacedTask = null;
                if (replaceType === "to_complete") {
                    replacedTask = user.currentTasks.find(t => t.id == id);
                    const cuttedTasks = user.currentTasks.filter(t => t.id !== id);
                    const userUpdate = await User.findByIdAndUpdate(
                        userID, 
                        {
                            currentTasks: cuttedTasks, 
                            completedTasks: [replacedTask, ...user.completedTasks]
                        },
                        {new: true}
                    );
                    res.status(200).json(replacedTask)
                };
                if (replaceType === "to_current") {
                    replacedTask = user.completedTasks.find(t => t.id == id);
                    const cuttedTasks = user.completedTasks.filter(t => t.id !== id);
                    const userUpdate = await User.findByIdAndUpdate(
                        userID, 
                        {
                            currentTasks: [replacedTask, ...user.currentTasks], 
                            completedTasks: cuttedTasks
                        },
                        {new: true}
                    );
                    res.status(200).json(replacedTask)
                }
            
        } catch (e) {
            console.log(e);
            res.status(400).json({message: ""})
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
            const updatedTasks = user.currentTasks;
            updatedTasks.forEach((t, index) => {
                if (t.id == newTask.id) {
                    user.currentTasks[index] = newTask;
                }
            });
            const updatedUser = await User.findByIdAndUpdate(userID, {
                currentTasks: updatedTasks
            });
            res.status(200).json(newTask)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: ""})
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
            const deleter = (cur, compl) => {
                const element = [...cur, ...compl].find(e => e.id == id);
                let updatedData = null;
                if (user.currentTasks.includes(element)) {
                    const updatedData = user.currentTasks.filter(e => e !== element);
                    return {currentTasks: updatedData}
                };
                if (user.completedTasks.includes(element)) {
                    const updatedData = user.completedTasks.filter(e => e !== element);
                    return {completedTasks: updatedData}
                };
                // функція має пповертати готове поле: {"taskListName": "updatedTaskList"}
            }
            const update = deleter(user.currentTasks, user.completedTasks);
            const updatedUser = await User.findByIdAndUpdate(userID, update, {new: true});
            res.status(200).json(update)    
        } catch (e) {
            console.log(e);
            res.status(400).json({message: ""})
        }
    }
};


module.exports = new UserController