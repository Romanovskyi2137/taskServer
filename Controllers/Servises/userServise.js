
class UserServise {
    getOne(tasks, taskID) {
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
    };
    create (tasks, task) {
        const checker = tasks.forEach(t => t.id == task.id);
        if (checker) {
            throw new Error ("task with same id is already have")
        }
    };
    replace (user, replaceType, id) {
                if (replaceType === "to_complete") {
                    const replacedTask = user.currentTasks.find(t => t.id == id);
                    const cuttedTasks = user.currentTasks.filter(t => t.id !== id);
                    return  {
                                currentTasks: cuttedTasks,
                                completedTasks: [replacedTask, ...user.completedTasks]
                            }       
                };
                if (replaceType === "to_current") {
                    const replacedTask = user.completedTasks.find(t => t.id == id);
                    const cuttedTasks = user.completedTasks.filter(t => t.id !== id);
                    return  {
                                completedTasks: cuttedTasks,
                                currentTasks: [replacedTask, ...user.currentTasks]
                            }     
                }
    };
    change (tasks, newTask) {
        const updatedData = tasks;
        updatedData.forEach((t, index) => {
            if (t.id == newTask.id) {
                updatedData[index] = newTask;
            }
        });
        return updatedData
    };
    delete (user, id) {
        const element = [...user.currentTasks, ...user.completedTasks].find(e => e.id == id);
                let updatedData = null;
                if (user.currentTasks.includes(element)) {
                    const updatedData = user.currentTasks.filter(e => e !== element);
                    return {currentTasks: updatedData}
                };
                if (user.completedTasks.includes(element)) {
                    const updatedData = user.completedTasks.filter(e => e !== element);
                    return {completedTasks: updatedData}
                };
    }
};


module.exports = new UserServise;