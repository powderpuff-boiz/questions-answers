const { q, a } = require('../models');

// ====== QUESTIONS ====== //

const questions = {
  getQuestions: (req, res) => {
    console.log('getQuestions reached!');
    // input: product ID (optional: page(1), & count(5))
    // output: questions with all answers
    // res.status(200).send(data);
  },
  postQuestion: (req, res) => {
    // input: product ID (others: body, name, email)
    // output: adds a question for given product - 201 CREATED
    // res.sendStatus(201);
  },
  markHelpful: (req, res) => {
    // input: question ID
    // output: updates question to show it was helpful - 204 NO CONTENT
    // res.sendStatus(204);
  },
  reportQuestion: (req, res) => {
    // input: question ID
    // output: updates question to show it was reported - 204 NO CONTENT
    // res.sendStatus(204);
  }
};

// ====== ANSWERS ====== //

const answers = {
  getAnswers: (req, res) => {
    // input: question ID (optional: page(1) & count(5))
    // output: answers for given question
    // res.status(200).send(data);
  },
  postAnswer: (req, res) => {
    // input: question ID (others: body, name, email, photos)
    // output: adds answer for given question - 201 CREATED
    // res.sendStatus(201);
  },
  markHelpful: (req, res) => {
    // input: answer ID
    // output: updates answer to show it was helpful - 204 NO CONTENT
    // res.sendStatus(204);
  },
  reportAnswer: (req, res) => {
    // input: answer ID
    // output: updates answer to show it was reported - 204 NO CONTENT
    // res.sendStatus(204);
  }
};


module.exports = {
  questions: questions,
  answers: answers
};