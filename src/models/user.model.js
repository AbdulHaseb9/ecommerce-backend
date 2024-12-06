const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
    username: {
        type: String,
        require: true,
        // unique: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    fullname: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String, // Cloudinary url
    },
}, { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User