const User = require("../userSchema");
const Role = require("../roleSchema");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const {secret} = require("../config");


const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    };
    return jwt.sign(payload, secret, {expiresIn: "12h"})
}

class AuthController {
    async registration (req, res) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "registration error", errors})
            }; 
            const {username, password} = req.body;
            if (password.includes(" ") || username.includes(" ")) {
                return res.status(400).json({message: "username or password includes space symbols"})
            };
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: "username already used"})
            };
            const hashPassword = bcrypt.hashSync(password, 5);
            const userRole = await Role.findOne({value: "USER"});
            const user = await new User({
                username: username,
                password: hashPassword,
                role: [userRole.value],
                completedTasks: [],
                currentTasks: [] 
            });
            await user.save();
            return res.status(200).json({message: "registration success"})
        } catch (e) {
            console.log(e);
            res.status(200).json({message: "registration error"})
        }
    };

    async login (req, res) {
        try{
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: `user with username ${username} is not found`})
            };
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: "incorrect password"})
            };
            const token = generateAccessToken(user._id, user.role);
            return res.status(200).json({token})
        } catch (e) {
            console.log(e);
            res.status(200).json({message: "login error"})
        }
    };

    async google_login (req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                const hashPassword = bcrypt.hashSync(password, 5);
                const userRole = await Role.findOne({value: "USER"});
                const user = await new User({
                    username: username,
                    password: hashPassword,
                    role: [userRole.value],
                    completedTasks: [],
                    currentTasks: [] 
                });
                await user.save();
                const token = generateAccessToken(user._id, user.role);
                return res.status(200).json({token, message: "Registration success!"})
            };
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: "incorrect password"})
            };
            const token = generateAccessToken(user._id, user.role);
            res.status(200).json({token, message: "Login success!"})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: "login error", error})
        }
    }

    async test (req, res) {
        try {
            res.status(200).json({message: "access aproove"})
        } catch (e) {
            console.log(e)
        }
    }
};

module.exports = new AuthController;