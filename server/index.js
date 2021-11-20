// const config = require('../config.js');
const express = require('express');
const router = require('./router.js');
const path = require('path');
const db = require('../database/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve up client files here
// app.use(express.static(path.join(__dirname, '../atelier/client/dist')));

app.use('/api/qa/', router);

// COMMENT OUT when testing === uncomment server.js //
const port = 3003;
app.get('/loaderio-163799adf39580bdb910225bc2cea4a0/', (req, res) => {
  res.sendFile(path.join(__dirname, 'loader.txt'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// ==================== //

module.exports = app;