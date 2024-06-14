const User = require("../models/user.model")
const uploadOnCloudinary = require("../utils/cloudinary")

const registerUser = async (req, resp) => {
    const { username, email, password, avatar } = req.body
    const da = new User({
        username,
        email,
        password,
        avatar
    })
    await da.save()
    resp.json('success')
}

const uploadAvatar = async (req, resp) => {
    const result = await uploadOnCloudinary(req.file.path)
    resp.json(result)
}

module.exports = { registerUser, uploadAvatar }