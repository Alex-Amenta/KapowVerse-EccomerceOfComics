const express = require('express');
const morgan = require('morgan');
const mainRouter = require('./routes/mainRouter');
const cors = require('cors');
require('dotenv').config();

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  FRONT_HOST,
} = process.env;

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
const upload = multer();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

app.use(upload.any());

app.use(mainRouter);

module.exports = app;
