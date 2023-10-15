require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mainRouter = require('./routes/mainRouter');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin", http://localhost:5173/`);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(mainRouter);

module.exports = app;
