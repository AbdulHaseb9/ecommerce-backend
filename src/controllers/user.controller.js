const Address = require("../models/address.model")
const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const uploadOnCloudinary = require("../utils/cloudinary")
require('dotenv').config()

// controller for registering user
const registerUser = async (req, resp) => {
    try {
        const { username, email, password, fullname } = req.body

        // check all field are filled properly
        if (!username || !email || !password || !fullname) {
            return resp.status(400).json({ message: 'All fields are required' })
        }

        // check user already exist  
        const alreadyexist = await User.findOne({ email })

        // if user already exist return error
        if (alreadyexist) {
            return resp.status(409).json({ message: 'email already taken' })
        }

        const hashedpassword = await bcrypt.hash(password, 6)

        const newUser = new User({
            username,
            email,
            password: hashedpassword,
            fullname
        })

        await newUser.save()

        resp.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        resp.status(410).json({ error })
    }
}

// controller for login user
const loginUser = async (req, resp) => {
    try {
        const { email, password } = req.body

        // if fields not filled properly return error
        if (!email || !password) {
            return resp.status(400).json({
                status: 'error',
                message: 'All fields are required'
            })
        }

        // find user using email address
        const isUserExist = await User.findOne({ email })

        // if user not exist return error
        if (!isUserExist) {
            return resp.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // compare original password to given password 
        const comparePassword = await bcrypt.compare(password, isUserExist.password)

        // if password does not match return error 
        if (!comparePassword) {
            return resp.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        resp.status(200).json({
            status: "succcess",
            message: 'Login successful'
        })

    } catch (error) {
        resp.status(410).json({
            status: 'error',
            error
        })
    }

}

// controller to get user address
const addressUser = async (req, resp) => {
    const { user, house_number, postal_code, city, state, country } = req.body

    const usr = await User.findById(user)

    console.log(usr);

    const newAddress = new Address({
        user: usr._id,
        house_number,
        postal_code,
        city,
        state,
        country
    })

    await newAddress.save()
    resp.json('success')
}

// controller to update user avatar
const updateAvatar = async (req, resp) => {
    const result = await uploadOnCloudinary(req.file.path)
    resp.json(result)
}

module.exports = { registerUser, updateAvatar, addressUser, loginUser }