const q = require('../models/questions.js');
const a = require('../models/answers.js');
const { Question, Answer } = require('../database/schema.js');
const { getResults } = require('./helpers.js');

const questions = {
  getQuestions: async (req, res) => {
    // console.log('CONTROLLER QUERY', req.query);
    let params = {
      product_id: Number(req.query.product_id),
      page: req.query.page !== undefined ? Number(req.query.page) : 1,
      count: req.query.count !== undefined ? Number(req.query.count) : 5
    };
    try {
      let quests = await q.get(params); // returns array of question docs
      let pending = []; // to store pending answer promises
      quests.forEach(q => {
        let answer = Answer.aggregate().match({ question_id: q.question_id, reported: 0 }).exec();
        pending.push(answer);
      });
      Promise.all(pending)
        .then((answers) => {
          let result = getResults(quests, answers);
          res.status(200).send(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  postQuestion: async (req, res) => {
    let params = {
      product_id: Number(req.body.product_id),
      name: req.body.name,
      email: req.body.email,
      body: req.body.body
    };
    try {
      let result = await q.post(params);
      console.log('Question created');
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  markHelpful: async (req, res) => {
    let params = req.params.question_id;
    try {
      let result = await q.helpful(params);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  reportQuestion: async (req, res) => {
    let params = req.params.question_id;
    try {
      let result = await q.report(params);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  }
};

module.exports = questions;