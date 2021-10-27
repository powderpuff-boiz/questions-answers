const q = require('../models/questions.js');

const questions = {
  getQuestions: async (req, res) => {
    let params = {};
    try {
      let result = await q.get(params);
      res.status(200).send(result);
    } catch(err) {
      console.error(err);
      res.sendStatus(400);
    }

    //console.log('+++++++++++getQuestions reached!', req.params);
    // res.send('controller connected');
    // input: product ID (optional: page(1), & count(5))
    // output: questions with all answers
    // invoke q.get
    // res.status(200).send(data);
  },
  postQuestion: async (req, res) => {
    let params: {};
    try {
      let result = await q.post(params);
      res.sendStatus(201);
    } catch(err) {
      console.error(err);
      res.sendStatus(400);
    }
    // input: product ID (others: body, name, email)
    // output: adds a question for given product - 201 CREATED
    // invoke q.post
    // res.sendStatus(201);
  },
  markHelpful: async (req, res) => {
    let params = {};
    try {
      let result = await q.helpful(params);
      res.sendStatus(204);
    } catch(err) {
      console.error(err);
      res.sendStatus(400);
    }
    // input: question ID
    // output: updates question to show it was helpful - 204 NO CONTENT
    // invoke q.helpful
    // res.sendStatus(204);
  },
  reportQuestion: async (req, res) => {
    let params = {};
    try {
      let result = await q.report(params);
      res.sendStatus(204);
    } catch(err) {
      console.error(err);
      res.sendStatus(400);
    }
    // input: question ID
    // output: updates question to show it was reported - 204 NO CONTENT
    // invoke q.report
    // res.sendStatus(204);
  }
};

module.exports = questions;