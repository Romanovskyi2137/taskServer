const User = require("../../userSchema");



class UserServise {
    async getOne (userID, taskID) {
        try {
            const user = await User.findById(userID);
            const tasks = [...user.currentTasks, ...user.completedTasks];
            let searchedTask = null;
            tasks.forEach(task => {
                if (task.id == taskID) {
                    searchedTask = task
                }
            });
            if(!searchedTask) {
                throw new Error ("task does not exist")
            }
            return searchedTask
        } catch (e) {
            throw e
        }
    };

    async getAll (userID) {
        try {
            const user = await User.findById(userID);
            const allTasks = [...user.currentTasks, ...user.completedTasks];
            return allTasks
        } catch (e) {
            throw e
        }
    };

    async getCurrent (userID) {
        try{
            const user = await User.findById(userID);
            const current = user.currentTasks;
            return current
        } catch (e) {
            throw e
        }
    };

    async getComplete (userID) {
        try{
            const user = await User.findById(userID);
            const completed = user.completedTasks;
            return completed
        } catch (e) {
            throw e
        }
    };

    async create (userID, task) {
        try {
            const user = await User.findById(userID);
            const tasks = [...user.currentTasks, ...user.completedTasks];
            const checker = tasks.find(t => t.id == task.id);
            if (checker) {
                throw new Error ("task with same id is already exist")
            };
            const updatedUser = await User.findByIdAndUpdate(userID, {currentTasks: [task,  ...user.currentTasks]}, {new: true});
            return task
        } catch (e) {
            throw e
        }
    };

    async replace (userID, replaceType, taskID) {
        try{
            const user = await User.findById(userID);
            let replacedTask;
            function updatedData () {
                if (replaceType === "to_complete") {
                    replacedTask = user.currentTasks.find(t => t.id == taskID);
                    const cuttedTasks = user.currentTasks.filter(t => t.id !== taskID);
                    return {
                        currentTasks: cuttedTasks,
                        completedTasks: [replacedTask, ...user.completedTasks]
                    }      
                };
                if (replaceType === "to_current") {
                    replacedTask = user.completedTasks.find(t => t.id == taskID);
                    const cuttedTasks = user.completedTasks.filter(t => t.id !== taskID);
                    return {
                        completedTasks: cuttedTasks,
                        currentTasks: [replacedTask, ...user.currentTasks]
                    }     
                }
            };
            const updateData = updatedData();
            if (!replacedTask) {
                throw new Error("taskID is incorrect")
            };
            const userUpdate = await User.findByIdAndUpdate(
                userID, 
                updateData,
                {new: true}
            );
            return replacedTask
        } catch (e) {
            throw e
        }
    };

    async change (userID, newTask) {
        try {
            const user = await User.findById(userID);
            const tasks = user.currentTasks;
            tasks.forEach((t, index) => {
                if (t.id == newTask.id) {
                    tasks[index] = newTask;
                }
            });
            if (!newTask) {
                throw new Error("taskID is incorrect")
            };
            const updatedUser = await User.findByIdAndUpdate(
                userID, 
                {currentTasks: tasks}
            );
            return newTask
        } catch (e) {
            throw e
        }
    };

    async delete (userID, taskID) {
        try {
            const user = await User.findById(userID);
            const element = [...user.currentTasks, ...user.completedTasks].find(e => e.id == taskID);
            let update = null;
            if (user.currentTasks.includes(element)) {
                const updatedData = user.currentTasks.filter(e => e !== element);
                update = {currentTasks: updatedData}
            };
            if (user.completedTasks.includes(element)) {
                const updatedData = user.completedTasks.filter(e => e !== element);
                update = {completedTasks: updatedData}
            };
            const updatedUser = await User.findByIdAndUpdate(userID, update, {new: true});
            return element
        } catch (e) {
            throw e
        }
    };

    async getToday (userID) {
        try {
            const user = await User.findById(userID);
            const tasks = user.currentTasks;
            const resData = tasks.filter(({endPoint}) => {
                return (endPoint - Date.now()) < (1000 * 60 * 60 * 24)
            });
            return resData
        } catch (e) {
            throw e
        }
    };

    async getUrgently (userID) {
        try {
            const urgentTime = 1000 * 60 * 60 * 24 * 3
            const user = await User.findById(userID);
            const tasks = user.currentTasks;
            const resData = tasks.filter(({endPoint}) => {
                return (endPoint - Date.now()) < urgentTime
            });
            return resData
        } catch (e) {
            throw e
        }
    };

    async getMajor (userID) {
        try {
            const user = await User.findById(userID);
            const tasks = user.currentTasks;
            const resData = tasks.filter(({prior}) => {
                return prior == 3
            });
            return resData
        } catch (e) {
            throw e
        }
    };
};


module.exports = new UserServise;