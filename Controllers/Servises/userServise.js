class UserServise {
    getOne(tasks, taskID) {
        let searchedTask = null;
        tasks.forEach(task => {
            if (task.id == taskID) {
                searchedTask = task
            }
        });
        return searchedTask
    }
};


module.exports = new UserServise;