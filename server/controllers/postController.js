


const postModel = require('../model/postModel')
const userModel = require('../model/userModel')

//@route  /api/v1/post

async function postCreate(req, res) {
    try {
        console.log(req.body);
        const user = await userModel.findById({ _id: req.body.user })

        const post = {
            user: req.body.user,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
        }
        const userPost = await postModel.create(post);
        res.json(userPost);
    } catch (error) {
        res.status(400).json(error.message);
    }
}
//@route  /api/v1/post
async function getAllPost(req, res) {
    try {
        let post = await postModel.find()
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err.message)
    }
}
//@route /api/v1/post/:id
async function getPost(req, res) {

    try {
        // console.log(req.params.id);
        let post = await postModel.findById({ _id: req.params.id })
        // let post = await postModel.findOne({ _id: req.params.id })
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err.message);
    }
}
module.exports = { postCreate, getAllPost, getPost }