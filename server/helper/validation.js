const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')

const userModel = require('../model/userModel')

async function validation(req, res, next) {
    const { name, email, password } = req.body

    try {
        if (name == "")
            return res.status(400).json({ err: "invalid name" });
        if (!validator.isEmail(email))
            return res.status(400).json({ err: "invalid email" })
        if (password.length <= 8)
            return res.status(400).json({ err: "Password must contain minimum of 8 character" })
        if (await userModel.findOne({ email })) {
            return res.status(400).json({ err: "already registered" })
        }
        next()
    }
    catch (err) {
        res.status(400).json({ err: err.message })
    }
}

async function profileExpValidation(req, res, next) {
    try {
        let { title, company, date } = req.body;
        if (title === "" || company === "" || date === "") {
            return res.json("title,company or date unfilled");
        }
        else next();
    } catch (error) {
        res.status(500).json(error.message);
    }
}
async function profileEduValidation(req, res, next) {
    try {
        let { school, degree } = req.body;
        if (school === "" || degree === "") {
            return res.json("school or degree  unfilled");
        }
        else next();
    } catch (error) {
        res.status(500).json(error.message);
    }
}
module.exports = { validation, profileExpValidation, profileEduValidation }