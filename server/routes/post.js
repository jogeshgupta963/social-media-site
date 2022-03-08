const express = require("express")
const postRouter = express.Router()

const { jwtVerify } = require('../helper/authHelper')
const { postCreate, getAllPost, getPost, deletePost, patchLike, deleteLike, postComment, deleteComment } = require('../controllers/postController')


//@route api/v1/post
//@desc  create post
//@access private
postRouter
    .route('/')
    .post(jwtVerify, postCreate);
postRouter
    .route('/')
    .get(getAllPost)
postRouter
    .route('/:id')
    .get(jwtVerify, getPost)
    .delete(jwtVerify, deletePost)

//@route api/v1/post/likes/:id
//@desc  like post
//@access private
postRouter
    .route('/likes/:id')
    .put(jwtVerify, patchLike)

//@route api/v1/post/unlikes/:id
//@desc  unlike post
//@access private
postRouter
    .route('/unlikes/:id')
    .put(jwtVerify, deleteLike)

//@route api/v1/post/comments
//@desc  post comment
//@access private
postRouter
    .route('/comments/:id')
    .post(jwtVerify, postComment)

postRouter
    .route('/comments/:id/:comment_id')
    .delete(jwtVerify, deleteComment)

module.exports = postRouter