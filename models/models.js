const { Question, Answer, Photo } = require('../database/schema.js');

// ====== QUESTIONS ====== //

const q = {
  get: (params) => {
    // query to grab questions by product ID
    // aggregate pipeline should be here
    // match by product ID
    // sort by question ID
    // limit to page & count
    // look up from answers collections
  },
  post: (params) => {
    // query to post question by product ID
    // grab all data and apply question model
    // Question.create(all the input data)
  },
  helpful: (params) => {
    // query to update question helpfulness
    // grab question ID
    // findOneAndUpdate - helpfulness + 1
  },
  report: (params) => {
    // query to report question
    // grab question ID
    // findOneAndUpdate - reported = 1
  }
};



// ====== ANSWERS ====== //

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

module.exports = { q: q, a: a };