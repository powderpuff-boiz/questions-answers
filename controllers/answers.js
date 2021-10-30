const a = require('../models/answers.js');

const answers = {
  getAnswers: async (req, res) => {
    let params = {
      id: Number(req.params.question_id),
      page: req.query.page !== undefined ? Number(req.query.page) : 1,
      count: req.query.count !== undefined ? Number(req.query.count) : 5
    };
    try {
      let result = await a.get(params);
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  postAnswer: async (req, res) => {
    let questionId = Number(req.params.question_id);
    let photosArr = req.query.photos !== '' ? req.query.photos : [];
    let params = {
      question_id: questionId,
      body: req.query.body,
      name: req.query.name,
      email: req.query.email,
      photos: photosArr
    };
    try {
      let result = await a.post(params);
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  markHelpful: async (req, res) => {
    let params = Number(req.params.answer_id);
    try {
      let result = await a.helpful(params);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  reportAnswer: async (req, res) => {
    let params = Number(req.params.answer_id);
    try {
      let result = await a.report(params);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  }
};

module.exports = answers;