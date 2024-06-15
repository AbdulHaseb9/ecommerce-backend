const { mongoose, Schema } = require("mongoose");

const addressSchema = mongoose.Schema(
    {
        user: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        house_number: {
            type: String,
            require: true,
        },
        postal_code: {
            type: String,
        },
        city: {
            type: String,
            require: true,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
    }, { timestamps: true }
)


const Address = mongoose.model('Address', addressSchema)

module.exports = Address