const Address = require("../models/address.model")
const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const uploadOnCloudinary = require("../utils/cloudinary")
require('dotenv').config()

// controller for registering user
const registerUser = async (req, resp) => {
    const { username, email, password, avatar } = req.body
    const alreadyexist = await User.findOne({ email })

    if (alreadyexist) {
        return resp.status(409).json({ message: 'email already taken' })
    }

    const hashedpassword = await bcrypt.hash(password, 6)

    const uploadAvatar = await uploadOnCloudinary(avatar)

    const newUser = new User({
        username,
        email,
        password: hashedpassword,
        avatar: uploadAvatar
    })

    await newUser.save()

    resp.status(201).json({ message: 'User registered successfully' });
}

// controller for login user
const loginUser = async (req, resp) => {
    const { email, password } = req.body
    const isUserExist = await User.findOne({ email })
    if (!isUserExist) {
        return resp.status(404).json({ message: 'User not found' });
    }
    const comparePassword = await bcrypt.compare(password, isUserExist.password)
    if (!comparePassword) {
        return resp.status(401).json({ message: 'Invalid email or password' });
    }
    resp.status(200).json({ message: 'Login successful' })
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

const updateAvatar = async (req, resp) => {
    const result = await uploadOnCloudinary(req.file.path)
    resp.json(result)
}

module.exports = { registerUser, updateAvatar, addressUser, loginUser }