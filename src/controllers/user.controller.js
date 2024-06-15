const Address = require("../models/address.model")
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
const addressUser = async (req, resp) => {
    const { user, add, password, avatar } = req.body

    const usr = await User.findById(user)

    console.log(usr);

    const da = new Address({
        user: usr._id,
        add,
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

module.exports = { registerUser, uploadAvatar, addressUser }