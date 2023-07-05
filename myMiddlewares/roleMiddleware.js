const jwt = require("jsonwebtoken");
const {secret} = require("../config");

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method == "OPTIONS") {
            next()
        };
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(400).json({message: "user is not authorized"}) 
            };
            const {role: userRole} = jwt.verify(token, secret);
            let hasRole = false;
            userRole.forEach(r => {
                if (roles.includes(r)) {
                    hasRole = true
                };
            });
            if (!hasRole) {
                return res.status(400).json({message: "user doesn`t have access rights"})
            };
            next()
        } catch (e) {
            return res.status(400).json({message: "user is not authorized"})
        }
    }
    
}