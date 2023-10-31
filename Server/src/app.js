require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mainRouter = require('./routes/mainRouter');
const cors = require('cors');

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

const upload = multer();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended:true, limit: '50mb'}))


app.use(upload.any());

app.use(mainRouter);

module.exports = app;
