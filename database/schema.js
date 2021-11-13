const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  id: { type: Number, unique: true, index: true, sparse: true },
  answer_id: { type: Number, index: true },
  url: { type: String }
});

const answerSchema = new mongoose.Schema({
  answer_id: { type: Number, unique: true, required: true },
  question_id: { type: Number, index: true, required: true },
  body: { type: String, required: true },
  date: { type: String, required: true },
  answerer_name: { type: String, required: true },
  email: { type: String },
  reported: { type: Boolean },
  helpfulness: { type: Number },
  photos: { type: [photoSchema], maxItems: 5 }
});

const questionSchema = new mongoose.Schema({
  question_id: { type: Number, unique: true, required: true },
  product_id: { type: Number, index: true, required: true },
  question_body: { type: String, required: true, maxLength: 1000 },
  question_date: { type: String, required: true },
  asker_name: { type: String, required: true },
  asker_email: { type: String },
  reported: { type: Boolean },
  question_helpfulness: { type: Number },
  answers: { type: [answerSchema] }
});

module.exports = {
  Question: mongoose.model('Question', questionSchema),
  Answer: mongoose.model('Answer', answerSchema),
  Photo: mongoose.model('Photo', photoSchema)
};


