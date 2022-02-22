const express = require("express")
const { jwtVerify, authData } = require('../helper/authHelper')
const { getProfile, postProfile } = require('../controllers/profileController')

const profileRouter = express.Router()


//@route GET /api/v1/profile    
//@desc  get user profile
profileRouter
    .route('/me')
    .get(jwtVerify, getProfile)
profileRouter
    .route('/')
    .post(jwtVerify, authData, postProfile)
module.exports = profileRouter