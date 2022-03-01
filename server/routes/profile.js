const express = require("express")
const { jwtVerify } = require('../helper/authHelper')
// const { getProfile, saveProfile } = require('../controllers/profileController')
const { getProfile, postProfile, getAllProfiles, getUserProfile, deleteUserProfile, putExp, deleteExp, putEdu, deleteEdu, getGithubRepos } = require('../controllers/profile')
const { profileExpValidation, profileEduValidation } = require('../helper/validation')
const profileRouter = express.Router()


//@route GET /api/v1/profile
//@desc to get current profile
profileRouter.route("/me")
    .get(jwtVerify, getProfile)

//@route POST /api/v1/profile
//@desc to create/update profile
profileRouter
    .route('/save')
    .post(jwtVerify, postProfile)

//@route GET /api/v1/profile
//@desc  to get all profiles

profileRouter
    .route('/')
    .get(jwtVerify, getAllProfiles)
// .get(jwtVerify, deleteUserProfile)

//@route GET /api/v1/profile/user/user_id
//@desc  to get user profiles
profileRouter
    .route('/user/:id_user')
    .get(getUserProfile)

//@route DELETE /api/v1/profile/user/user_id
//@desc  to get user profiles
profileRouter
    .route('/user/:id_user')
    .delete(jwtVerify, deleteUserProfile)

//@route PUT /api/v1/profile/experience        DELETE /api/v1/profile/experience
//@desc  to update user profiles experience         to delete user profile's experience
profileRouter
    .route('/experience')
    .put(jwtVerify, profileExpValidation, putExp)
    .delete(jwtVerify, deleteExp)

//@route PUT /api/v1/profile/education        DELETE /api/v1/profile/education
//@desc  to update user profiles education         to delete user profile's education
profileRouter
    .route('/education')
    .put(jwtVerify, profileEduValidation, putEdu)
    .delete(jwtVerify, deleteEdu)

//@route GET /api/v1/profile/

profileRouter
    .route('/github/:username')
    .get(getGithubRepos)
module.exports = profileRouter