const profileModel = require("../model/profileModel")
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


//@route POST /api/v1/profile/save
//@desc to save user details in its profile
async function postProfile(req, res) {
    let data = req.body;
    let isExist = await profileModel.findOne({ user: data.user })

    let profile = new profileModel(data);
    if (!isExist) {
        profile.save();
        return res.json(profile)
    }
    // let user = await profileModel.findByIdAndUpdate({ user: data.user }, data)
    let user = await profileModel.findOneAndUpdate({ user: data.user }, data)
    return res.json("saved");
}


async function getProfile(req, res) {

    let prof = await profileModel.findOne({ user: req.body.user })
    res.json(prof)
}
module.exports = { getProfile, postProfile }