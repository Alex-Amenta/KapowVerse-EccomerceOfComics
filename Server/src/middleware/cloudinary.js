const cloudinary = require('cloudinary').v2;

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const {CLOUD_NAME, API_KEY, API_SECRET} = process.env;

cloudinary.config({
    cloud_name:CLOUD_NAME,
    api_key:API_KEY,
    api_secret:API_SECRET,
});

module.exports = cloudinary;
