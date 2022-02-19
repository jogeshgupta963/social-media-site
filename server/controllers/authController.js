const mongoose = require('mongoose')
const userModel = require('../model/userModel')


async function login(req, res) {
    let id = req.body.payload;
    let user = await userModel.findById(id);
    res.status(200).json({ msg: user })
}
module.exports = { login }