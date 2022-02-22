
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")
require('dotenv').config()

const profileModel = require('../model/profileModel')
//@route GET /api/v1.profile/me
async function getProfile(req, res) {

    let prof = await profileModel.findOne({ user: req.body.payload })
    if (!prof) {
        return res.status(400).json({ err: "Profile Doesnt exist" })
    }
    res.status(200).json(prof)

}
//@route POST /api/v1/profile/
async function postProfile(req, res) {

    try {


        // const userDetails = await profileModel.create(data)
        const {
            company,
            website,
            location,
            bio,
            status,
            githubUsername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedIn
        } = req.body
        //prof
        const userProfile = {}
        userProfile.user = req.body.user
        if (company) userProfile.company = company
        if (website) userProfile.website = website
        if (website) userProfile.website = website
        if (location) userProfile.location = location
        if (bio) userProfile.bio = bio
        if (status) userProfile.status = status
        if (githubUsername) userProfile.githubUsername = githubUsername
        if (skills) {
            userProfile.skills = skills.split(',').map(skill => skill.trim())
        }

        //social
        userProfile.social = {}
        if (youtube) userProfile.social.youtube = youtube
        if (twitter) userProfile.social.twitter = twitter
        if (facebook) userProfile.social.facebook = facebook
        if (linkedIn) userProfile.social.linkedIn = linkedIn
        if (instagram) userProfile.social.instagram = instagram

        try {
            //update
            let profile = await profileModel.findOne({ user: req.body.user })
            if (profile) {
                profile = await profileModel.findOneAndUpdate({ user: req.body.user }, userProfile)
                return res.json(profile)
            }
            //create
            // profile = new profileModel(userProfile)
            // await profile.save()
            await profileModel.create(userProfile)
            return res.json("hello")
        } catch (error) {
            res.status(400).json(error.message)
        }


    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = { getProfile, postProfile }