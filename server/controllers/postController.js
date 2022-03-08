


const postModel = require('../model/postModel')
const userModel = require('../model/userModel')

//@route  /api/v1/post

async function postCreate(req, res) {
    try {
        // console.log(req.body);
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
        if (!post) {
            return res.status(400).json("Post not found")
        }
        // let post = await postModel.findOne({ _id: req.params.id })
        res.status(200).json(post);
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(400).json("Post not found")
        }
        res.status(400).json(err.message);
    }
}
//@route /api/v1/post/:id
async function deletePost(req, res) {
    try {
        let data = await postModel.findOneAndDelete({ _id: req.params.id })
        res.json("deleted")
    } catch (err) {
        res.status(400).json(err.message);
    }
}
//@route /api/v1/post/likes/:id
async function patchLike(req, res) {
    try {
        let post = await postModel.findById(req.params.id)

        // console.log(post);
        // checking if the post has liked
        if (post.likes.filter(like => like.user.toString() === req.body.user).length > 0) {
            return res.status(400).json("Post already liked")
        }
        post.likes.push({ user: req.body.user })
        await post.save();
        res.status(200).json(post.likes);
    } catch (err) {
        res.status(400).json(err.message);
    }

}

//@route /api/v1/post/unlikes/:id
async function deleteLike(req, res) {
    try {
        let post = await postModel.findById(req.params.id)

        // console.log(post);
        // checking if the post has liked
        if (post.likes.filter(like => like.user.toString() === req.body.user).length == 0) {
            return res.status(400).json("Post has not yet been liked")
        }
        const removeIndex = post.likes.map(like => like.user.toString().indexOf(req.body.user));

        post.likes.splice(removeIndex, 1);
        await post.save();
        res.status(200).json(post.likes);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

//@route /api/v1/post/comment/:id
async function postComment(req, res) {
    try {
        const user = await userModel.findById({ _id: req.body.user })
        const post = await postModel.findById(req.params.id)

        const comment = {
            user: req.body.user,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
        }
        post.comments.push(comment)
        await post.save();

        res.json(post.comments);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

//@route /api/v1/post/comment/:id
async function deleteComment(req, res) {
    try {

        let post = await postModel.findById(req.params.id);
        // getting comment from the post
        let comment = post.comments.find(com => com.id == req.params.comment_id)

        if (!comment) {
            return res.json("no comment found")
        }
        if (comment.user.toString() != req.body.user) {
            return res.json("not authorised")
        }
        const removeIndex = post.comments.map(com => com.user.toString().indexOf(req.body.user));

        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post.comments)
    } catch (err) {
        res.status(400).json(err.message)
    }
}

module.exports = { postCreate, getAllPost, getPost, deletePost, patchLike, deleteLike, postComment, deleteComment }