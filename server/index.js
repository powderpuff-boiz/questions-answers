const config = require('../config.js');
const express = require('express');
const router = require('./router.js');
const db = require('../database/index.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/qa/', router);


module.exports = app;