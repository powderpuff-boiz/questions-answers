const { Question, Answer, Photo } = require('../database/schema.js');

const a = {
  get: async (params) => {
    let answersList = await Answer.aggregate()
      .match({ question_id: params.id, reported: 0 })
      .limit(params.page * params.count)
      .project({ '_id': 0, 'question_id': 0, 'email': 0, 'reported': 0, 'photos.answer_id': 0 });
    return {
      question: params.id.toString(),
      page: params.page,
      count: params.count,
      results: answersList
    };
  },

  post: async (params) => {
    await Answer.find({}).sort({ answer_id: -1 }).limit(1)
      .then((answer) => {
        let answerId = answer[0].answer_id + 1;
        let newDate = new Date();
        let finalDate = newDate.toISOString();
        return Answer.create({
          answer_id: answerId,
          question_id: params.question_id,
          body: params.body,
          date: finalDate,
          answerer_name: params.name,
          reported: 0,
          helpfulness: 0,
          photos: params.photos
        })
          .then((res) => {
            return res;
          })
          .catch((err) => {
            console.log('Error creating answer');
          });
      })
      .catch((err) => {
        console.error('model post answer error', err);
      });
  },

  helpful: async (params) => {
    let answerId = params;
    await Answer.findOneAndUpdate({ answer_id: answerId }, { $inc: {helpfulness: 1} })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  },

  report: async (params) => {
    let answerId = params;
    await Answer.findOneAndUpdate({ answer_id: answerId }, { reported: 1 })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

module.exports = a;