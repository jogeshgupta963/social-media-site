const mongoose = require('mongoose')

const userSchema = new Schema({

    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    avatar: {
        type: String
    },
    date: {
        type: String,
        default: Date.now
    }
})

const userModel = mongoose.model('userModel', userSchema)
module.exports = userModel