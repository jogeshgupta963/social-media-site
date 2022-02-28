const profileModel = require("../model/profileModel")
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


//@route POST /api/v1/profile/save
//@desc to save user details in its profile
async function postProfile(req, res) {
    try {


        let data = req.body;
        let isExist = await profileModel.findOne({ user: data.user })
        // data.skills = data.skills[0].split(',').map(skills => skills.trim())
        // console.log("splitt")
        // let skills = data.skills.split(',')
        // data.skills = skills;
        let skills = data.skills;
        data.skills = skills.toString().split(',');

        let profile = new profileModel(data);
        if (!isExist) {
            profile.save();
            return res.status(200).json("saved")
        }
        // let user = await profileModel.findByIdAndUpdate({ user: data.user }, data)
        let user = await profileModel.findOneAndUpdate({ user: data.user }, data)
        return res.status(200).json("saved");
    } catch (error) {
        // console.log("Err here")
        res.status(400).json(error.message);
    }
}

//route GET /api/v1/profile/me
async function getProfile(req, res) {
    try {
        let prof = await profileModel.findOne({ user: req.body.user })
        res.status(200).json(prof)

    } catch (error) {
        res.status(400).json(error.message)
    }
}
//route GET /api/v1/profile/
async function getAllProfiles(req, res) {

    try {
        let data = await profileModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error.message)
    }
}
//route GET /api/v1/profile/user/:id_user

async function getUserProfile(req, res) {
    // console.log(req.body)
    try {
        let userData = await profileModel.findOne({ user: req.params.id_user })
        if (!userData) {
            return res.status(400).json("user not found")
        }
        res.status(200).json(userData)

    } catch (error) {
        if (error.kind === "ObjecdId") {
            return res.status(400).json("user not found");
        }
        res.status(500).json(error.message);
    }
}

//route DELETE /api/v1/profile/user/:id_user
async function deleteUserProfile(req, res) {

    try {
        let userData = await profileModel.findOneAndDelete({ user: req.body.user })

        res.status(200).json("deleted")
    } catch (error) {
        if (error.kind === "ObjecdId") {
            return res.status(400).json("user not found");
        }
        res.status(500).json(error.message);
    }
}

//route PUT /api/v1/profile/experience
async function putExp(req, res) {
    try {
        let { title, company, location, from, to, currently, description } = req.body;

        let profile = await profileModel.findOne({ user: req.body.user })
        profile.experience.push({ title, company, location, from, to, currently, description });
        await profile.save()
        res.json("added exp")

    } catch (err) {
        res.status(400).json(err.message)
    }
}
//route /api/v1/profile/experience
async function deleteExp(req, res) {

    try {
        let user = await profileModel.findOne({ user: req.body.user })
        user.experience = [];
        user.save();
        res.json("deleted");
    } catch (err) {
        res.status(400).json(err.message);
    }
}
//route PUT /api/v1/profile/education
async function putEdu(req, res) {
    try {
        let { school, degree, fieldOfStudy, from, to, current, description } = req.body;

        let profile = await profileModel.findOne({ user: req.body.user })
        profile.education.push({ school, degree, fieldOfStudy, from, to, current, description });
        await profile.save()
        res.json("added education")

    } catch (err) {
        res.status(400).json(err.message)
    }
}
//route /api/v1/profile/education
async function deleteEdu(req, res) {

    try {
        let user = await profileModel.findOne({ user: req.body.user })
        user.education = [];
        user.save();
        res.json("deleted");
    } catch (err) {
        res.status(400).json(err.message);
    }
}
module.exports = { getProfile, postProfile, getAllProfiles, getUserProfile, deleteUserProfile, putExp, deleteExp, putEdu, deleteEdu }