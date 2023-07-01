const express = require("express");
const userRouter = require("./Routers/userRouter");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/task_space", userRouter)

const startApp = async () => {
    try{
        await mongoose.connect("mongodb+srv://romanovskyi2137:2137@node-js-practice.dl3l1b2.mongodb.net/")
        app.listen(PORT, () => console.log('server is working'))
    } catch (e) {
        console.log(e)
    }

};

startApp();
