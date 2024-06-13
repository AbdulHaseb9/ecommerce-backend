const mongoose = require('mongoose')

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('db connect successfully');
    } catch (error) {
        console.log(`db not connected ${error}`);
    }
}

module.exports = dbconnect