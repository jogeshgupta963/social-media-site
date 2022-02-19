
const cookieParser = require("cookie-parser")
const jwt = require('jsonwebtoken')
require('dotenv').config()


function jwtVerify(req, res, next) {
    try {
        let token = req.cookies.JWT

        let isLoggedIn = jwt.verify(token, process.env.JWT_SECRET)
        req.body = isLoggedIn
        next();

    } catch (error) {
        res.status(400).json("Unauthorised access is not permited")
    }

}

module.exports = { jwtVerify }