const express = require("express")

const profileRouter = express.Router()

profileRouter

    .get('/', (req, res) => {
        res.send("profile")
    })

module.exports = profileRouter