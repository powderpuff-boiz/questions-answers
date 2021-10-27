const a = require('../models/answers.js');

const answers = {
  getAnswers: (req, res) => {
    // input: question ID (optional: page(1) & count(5))
    // output: answers for given question
    // invoke a.get
    // res.status(200).send(data);
  },
  postAnswer: (req, res) => {
    // input: question ID (others: body, name, email, photos)
    // output: adds answer for given question - 201 CREATED
    // invoke a.post
    // res.sendStatus(201);
  },
  markHelpful: (req, res) => {
    // input: answer ID
    // output: updates answer to show it was helpful - 204 NO CONTENT
    // invoke a.helpful
    // res.sendStatus(204);
  },
  reportAnswer: (req, res) => {
    // input: answer ID
    // output: updates answer to show it was reported - 204 NO CONTENT
    // invoke a.report
    // res.sendStatus(204);
  }
};

module.exports = answers;