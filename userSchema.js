const {Schema, model} = require("mongoose");


const User = new Schema ({
    username: String,
    password: String,
    role: String,
    currentTasks: [],
    completedTasks: []
});


module.exports = model("User", User);