const express = require("express")

const postRouter = express.Router()

postRouter

    .get('/', (req, res) => {
        res.send("posts")
    })

module.exports = postRouter