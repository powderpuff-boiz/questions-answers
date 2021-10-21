const config = require('../config.js');
const express = require('express');
const db = require('../database/index.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
