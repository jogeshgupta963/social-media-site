const express = require('express')
const gravatar = require('gravatar')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")

const userModel = require('../model/userModel')
require("dotenv").config()

async function postSignup(req, res) {
    try {

        let { name, email, password } = req.body
        //gravatar 
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        // //hashing passwords
        let salt = await bcrypt.genSalt();

        let hashedString = await bcrypt.hash(password, salt.toString());

        password = hashedString;

        //creating user
        let user = await userModel.create({ name, email, password, avatar })
        // nodemailer email thx for joining us


        //creating jwt
        const JWT = jwt.sign({ payload: user._id }, process.env.JWT_SECRET, { expiresIn: 60 })

        res.cookie("JWT", JWT, { httpOnly: true })
        return res.status(200).json("User Registered")

    } catch (error) {
        res.status(404).json(error.message)
    }
}

module.exports = { postSignup } 
