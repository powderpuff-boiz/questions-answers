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
        });
      })
      .catch((err) => {
        console.error('model post answer error', err);
      });
  },

  helpful: async (params) => {
    let answerId = params;
    await Answer.find({ answer_id: answerId })
      .then((answer) => {
        let helpful = answer[0].helpfulness + 1;
        return Answer.findOneAndUpdate(
          { answer_id: answerId },
          { helpfulness: helpful }
        );
      })
      .catch((err) => {
        console.error('model answer helpful error', err);
      });
  },

  report: async (params) => {
    let answerId = params;
    return await Answer.findOneAndUpdate(
      { answer_id: answerId },
      { reported: 1 }
    );
  }
};

module.exports = a;