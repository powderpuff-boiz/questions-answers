const { Question, Answer, Photo } = require('../database/schema.js');
const { getResults, updateResults, formatQuestions } = require('./helpers.js');

const q = {
  get: async (params) => {
    console.log('testing params', params);
    let result = await Question.aggregate()
      .match({ product_id: params.product_id, reported: 0 })
      .limit(params.page * params.count)
      .lookup({
        from: 'answers',
        localField: 'question_id',
        foreignField: 'question_id',
        as: 'answers'
      })
      .project({
        '_id': 0,
        'asker_email': 0,
        'answers._id': 0,
        'answers.question_id': 0,
        'answers.email': 0,
        'answers.reported': 0
      });
    return getResults(result);

  },

  post: async (params) => {
    await Question.find({}).sort({ question_id: -1 }).limit(1)
      .then((lastQuestion) => {
        let questionId = lastQuestion[0].question_id + 1;
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
        });
      })
      .catch((err) => {
        console.error('model post question error', err);
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
    // await Question.findOne({ question_id: questionId }).limit(1)
    //   .then((question) => {
    //     let helpful = question[0].question_helpfulness + 1;
    //     return Question.findOneAndUpdate(
    //       { question_id: questionId },
    //       { question_helpfulness: helpful }
    //     );
    //   })
    //   .catch((err) => {
    //     console.error('model question helpful error', err);
    //   });
  },

  report: async (params) => {
    let questionId = Number(params);
    return await Question.findOneAndUpdate(
      { question_id: questionId },
      { reported: 1 }
    )
  }
};

module.exports = q;