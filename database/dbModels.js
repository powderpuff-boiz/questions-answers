const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: { type: Number },
  product_id: { type: Number },
  question_body: { type: String },
  question_date: { type: String },
  asker_name: { type: String },
  question_helpfulness: { type: Number },
  reported: { type: Number }
});

const answerSchema = new mongoose.Schema({
  id: { type: Number },
  question_id: { type: Number },
  body: { type: String },
  date: { type: String },
  answerer_name: { type: String },
  reported: { type: Number },
  helpfulness: { type: Number }
});

const photoSchema = new mongoose.Schema({
  id: { type: Number },
  answer_id: { type: Number },
  url: { type: String }
});

module.exports = {
  Question : mongoose.model('Question', questionSchema),
  Answer : mongoose.model('Answer', answerSchema),
  Photo : mongoose.model('Photo', photoSchema)
};


