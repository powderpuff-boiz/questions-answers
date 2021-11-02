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

    // let questionsList = [];
    // let answersList = [];

    // Question.find({ product_id: params.product_id }).limit(params.page * params.count)
    //   .then((questions) => {
    //     questions.forEach(question => {
    //       const qObj = {
    //         question_id: question.question_id,
    //         question_body: question.question_body,
    //         question_date: question.question_date,
    //         asker_name: question.asker_name,
    //         question_helpfulness: question.question_helpfulness,
    //         reported: Boolean(question.reported),
    //         answers: {}
    //       };
    //       questionsList.push(qObj);
    //       //console.log('MODEL QUESTIONS', questionsList);
    //       questionsList.forEach(async (q) => {
    //         await Answer.find({ question_id: q.question_id })
    //           .then((a) => {
    //             let
    //             answersList.push(a[0]);
    //             console.log('MODEL ANSWERS', answersList);
    //           })
    //           .catch((err) => {
    //             console.error(err);
    //           })
    //       });
    //     })
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });


    // Question.find({ product_id: params.product_id }).limit(params.page * params.count)
    //   .then(async (questions) => {
    //     // questionsList = questions;
    //     questionList = await formatQuestions(questionsList);
    //     console.log('QUESTIONS LIST', questionsList);
    //     let answers = questions.forEach((q) => {
    //       Answer.find({ question_id: q.question_id })
    //         .then((answers) => {
    //           answers.forEach(a => {
    //             answersList.push(a);
    //           });
    //           // console.log('ANSWERS LIST', answersList);
    //           return updateResults(questionsList, answersList);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
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
    await Question.find({ question_id: questionId }).limit(1)
      .then((question) => {
        let helpful = question[0].question_helpfulness + 1;
        return Question.findOneAndUpdate(
          { question_id: questionId },
          { question_helpfulness: helpful }
        );
      })
      .catch((err) => {
        console.error('model question helpful error', err);
      });
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