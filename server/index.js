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
app.get('/loaderio-7b8381b66c12f7f96421acb322d864a1/', (req, res) => {
  res.sendFile(path.join(__dirname, 'loader.txt'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// ==================== //

module.exports = app;