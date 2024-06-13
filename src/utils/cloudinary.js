const cloudinary = require('cloudinary');
const fs = require('fs')
require('dotenv').config()


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localfilepath) => {
    // if path not defined show error
    if (!localfilepath) {
        return console.log('file required');
    }
    // else Upload an image
    const uploadResult = await cloudinary.uploader.upload(localfilepath).catch((error) => { console.log(error) });
    if (uploadResult) {
        // if file uploaded delete it from temp folder 
        fs.unlink(localfilepath, (err) => {
            if (err) console.log(err);
            console.log('file deleted');
        })
        return uploadResult
    }
    // If file doesn't uploaded keep it on temp folder
    else {
        resp.json({ message: 'file does not uploaded' })
    }
}


module.exports = uploadOnCloudinary

