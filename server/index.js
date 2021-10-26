const config = require('../config.js');
const express = require('express');
const db = require('../database/index.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/questions', (req, res) => {
  console.log('GET /questions connected!');
  // input: product ID (optional: page(1), & count(5))
  // output: questions with all answers
});

app.get('/questions/:question_id/answers', (req, res) => {
  console.log('GET answers connected!');
  // input: question ID (optional: page(1) & count(5))
  // output: answers for given question
});

app.post('/questions', (req, res) => {
  console.log('POST /questions connected!');
  // input: product ID (others: body, name, email)
  // output: adds a question for given product - 201 CREATED
});

app.post('/questions/:question_id/answers', (req, res) => {
  console.log('POST answer connected!');
  // input: question ID (others: body, name, email, photos)
  // output: adds answer for given question - 201 CREATED
});


app.put('/questions/:question_id/helpful', (req, res) => {
  console.log('PUT helpful question connected!');
  // input: question ID
  // output: updates question to show it was helpful - 204 NO CONTENT
});

app.put('/questions/:question_id/report', (req, res) => {
  console.log('PUT report question connected!');
  // input: question ID
  // output: updates question to show it was reported - 204 NO CONTENT
});


app.put('/answers/:answer_id/helpful', (req, res) => {
  console.log('PUT helpful answer connected!');
  // input: answer ID
  // output: updates answer to show it was helpful - 204 NO CONTENT
});

app.put('/answers/:answer_id/report', (req, res) => {
  console.log('PUT report answer connected!');
  // input: answer ID
  // output: updates answer to show it was reported - 204 NO CONTENT
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
