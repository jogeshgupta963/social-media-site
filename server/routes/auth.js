const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = express.Router()

const { jwtVerify } = require("../helper/authHelper")
const { login } = require('../controllers/authController')
//@route GET /api/v1/auth
//@desc      /login

authRouter
    .route('/')
    .get(jwtVerify, login)

module.exports = authRouter