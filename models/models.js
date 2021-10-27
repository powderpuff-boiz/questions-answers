const { Question, Answer, Photo } = require('../database/schema.js');

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
    //
  },
  report: (params) => {
    // query to report question
  }

};

const a = {
  get: (params) => {

  },
  post: (params) => {

  },
  helpful: (params) => {

  },
  report: (params) => {

  }
};

module.exports = {
  q: q,
  a: a
};