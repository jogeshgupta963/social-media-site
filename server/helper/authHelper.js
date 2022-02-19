
const cookieParser = require("cookie-parser")
const jwt = require('jsonwebtoken')
const validator = require('validator')
require('dotenv').config()


function jwtVerify(req, res, next) {
    try {
        let token = req.cookies.JWT

        let isLoggedIn = jwt.verify(token, process.env.JWT_SECRET)
        if (isLoggedIn) {
            req.body = isLoggedIn
            next();
        }
        else {
            res.status(300).json("wrong jwt")
        }

    } catch (error) {
        res.status(400).json("Unauthorised access is not permited")
    }

}

async function validation(req, res, next) {
    const { email, password } = req.body

    try {
        if (!validator.isEmail(email))
            return res.status(400).json({ err: "invalid email" })
        if (password == "")
            return res.status(400).json({ err: "invalid password" })
        next()
    }
    catch (err) {
        res.status(400).json({ err: "helper" + err.message })
    }
}
module.exports = { jwtVerify, validation }