const uploadOnCloudinary = require("../utils/cloudinary")

const registerUser = async (req, resp) => {
    resp.json('successfully updated to professional backend')
}

const uploadAvatar = async (req, resp) => {
    const result = await uploadOnCloudinary(req.file.path)
    resp.json(result)
}

module.exports = { registerUser, uploadAvatar }