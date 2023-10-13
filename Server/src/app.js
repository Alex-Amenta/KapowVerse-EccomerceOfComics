const express = require('express');
const morgan = require('morgan');
const mainRouter = require('./routes/mainRouter');
const cors = require('cors');


const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(cors());


app.use(mainRouter);

module.exports = app;
