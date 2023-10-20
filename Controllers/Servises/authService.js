const User = require("../../userSchema");
const Role = require("../../roleSchema");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {secret} = require("../../config");

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    };
    return jwt.sign(payload, secret, {expiresIn: "12h"})
}

class AuthService {
    async registration (username, password, errors) {
        try {
            if (!errors.isEmpty()) {
                throw new Error("registration error, some fields are empty!")
            }; 
            if (password.includes(" ") || username.includes(" ")) {
                throw new Error("username or password includes space symbols")
            };
            const candidate = await User.findOne({username});
            if (candidate) {
                throw new Error("username already used")
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
            return user
        } catch (e) {
            throw e
        }
    };

    async login (username, password) {
        try{
            const user = await User.findOne({username});
            if (!user) {
                throw new Error(`user with username ${username} is not found`)
            };
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                throw new Error("incorrect password")
            };
            const token = generateAccessToken(user._id, user.role);
            return token
        } catch (e) {
            throw e
        }
    };

    async google_login (username, password) {
        try {
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
                return token
            };
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                throw new Error("incorrect password")
            };
            const token = generateAccessToken(user._id, user.role);
            return token
        } catch (e) {
            return e
        }
    }

    async test (req, res) {
        try {
            // res.status(200).json({message: "access aproove"})
        } catch (e) {
            console.log(e)
        }
    }
};

module.exports = new AuthService;