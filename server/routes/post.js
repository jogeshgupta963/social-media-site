const express = require("express")
const postRouter = express.Router()

const { jwtVerify } = require('../helper/authHelper')
const { postCreate, getAllPost, getPost } = require('../controllers/postController')


//@route api/v1/post
//@desc  create post
//@access private
postRouter
    .route('/')
    .post(jwtVerify, postCreate);
postRouter
    .route('/')
    .get(jwtVerify, getAllPost)
postRouter
    .route('/:id')
    .get(jwtVerify, getPost)
module.exports = postRouter