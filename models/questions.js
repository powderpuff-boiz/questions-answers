const { Question, Answer, Photo } = require('../database/schema.js');
const { nextId } = require('../database/index.js');

const q = {
  get: async (params) => {
    let result = await Question.aggregate()
      .match({ product_id: params.product_id, reported: 0 })
      .limit(params.page * params.count);
    return result;
  },

  post: async (params) => {
    await nextId('question')
      .then((questionId) => {
        return Question.create({
          question_id: questionId,
          product_id: params.product_id,
          question_body: params.body,
          question_date: new Date(),
          asker_name: params.name,
          asker_email: params.email,
          question_helpfulness: 0,
          reported: 0,
          answers: []
        })
          .then((res) => {
            return res;
          })
          .catch(err => {
            console.log('Error creating question', err);
            return err;
          });
      })
      .catch((err) => {
        console.error('model post question error', err);
        return err;
      });
  },

  helpful: async (params) => {
    let questionId = Number(params);
    await Question.findOneAndUpdate({ question_id: questionId }, { $inc: {question_helpfulness: 1} })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  report: async (params) => {
    let questionId = Number(params);
    await Question.findOneAndUpdate({ question_id: questionId }, { reported: 1 })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
};

module.exports = q;