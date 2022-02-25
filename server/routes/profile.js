const express = require("express")
const { jwtVerify, authData } = require('../helper/authHelper')
// const { getProfile, saveProfile } = require('../controllers/profileController')
const { getProfile, postProfile } = require('../controllers/profile')

const profileRouter = express.Router()

profileRouter.route("/me")
    .get(jwtVerify, getProfile)
profileRouter
    .route('/save')

    .post(jwtVerify, postProfile)
module.exports = profileRouter