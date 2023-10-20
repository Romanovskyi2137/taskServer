const AuthService = require("./Servises/authService");
const {validationResult} = require("express-validator");


class AuthController {
    async registration (req, res) {
        try{
            const {username, password} = req.body;
            const errors = validationResult(req);
            const data = await AuthService.registration(username, password, errors);
            return res.status(200).json({message: "registration success"})
        } catch (e) {
            res.status(400).json(e.message)

        }
    };

    async login (req, res) {
        try{
            const {username, password} = req.body;
            const token = await AuthService.login(username, password);
            return res.status(200).json({token})
        } catch (e) {
            res.status(400).json(e.message)
        }
    };

    async google_login (req, res) {
        try {
            const {username, password} = req.body;
            const token = await AuthService.google_login(username, password)
            res.status(200).json({token, message: "Login success!"})
        } catch (e) {
            res.status(400).json(e.message)
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