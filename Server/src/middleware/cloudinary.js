const cloudinary = require('cloudinary').v2;

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
});

module.exports = cloudinary;
