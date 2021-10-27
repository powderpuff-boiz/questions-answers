const { Question, Answer, Photo } = require('../database/schema.js');

const a = {
  get: (params) => {
    // query to grab answers for specific question
    // grab questionID, page, count
    // match by question ID
    // sort by id: 1
    // limit to page and count
  },
  post: (params) => {
    // query to create new answer
    // grab question ID
    // get answer data and apply answer model
    // Answer.create(answer data)
  },
  helpful: (params) => {
    // query to update answer helpfulness
    // grab answer ID
    // findOneAndUpdate - helpfulness + 1
  },
  report: (params) => {
    // query to report answer
    // grab answer ID
    // findOneAndUpdate - reported = 1
  }
};

module.exports = a;