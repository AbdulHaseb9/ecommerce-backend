const { mongoose, Schema } = require("mongoose");

const addressSchema = mongoose.Schema(
    {
        user: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        add: {
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


const Address = mongoose.model('Address', addressSchema)

module.exports = Address