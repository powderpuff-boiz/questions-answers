const q = require('../models/questions.js');

const questions = {
  getQuestions: async (req, res) => {
    let params = {
      product_id: Number(req.query.productId),
      page: req.query.page !== undefined ? Number(req.query.page) : 1,
      count: req.query.count !== undefined ? Number(req.query.count) : 5
    };
    try {
      let result = await q.get(params);
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  postQuestion: async (req, res) => {
    let parsedBody = req.query.body.split('%20').join(' ');
    let params = {
      product_id: Number(req.query.product_id),
      name: req.query.name,
      email: req.query.email,
      body: parsedBody
    };
    try {
      let result = await q.post(params);
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