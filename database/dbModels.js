const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  answerId: { type: Number },
  url: { type: String }
});

const answerSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  questionId: { type: Number },
  body: { type: String },
  date: { type: String },
  name: { type: String },
  reported: { type: Number },
  helpfulness: { type: Number },
  photos: {
    type: [photoSchema],
    maxItems: 5
  }
});

const questionSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  productId: { type: Number },
  body: { type: String },
  date: { type: String },
  name: { type: String },
  reported: { type: Number },
  helpfulness: { type: Number },
  answers: [answerSchema]
});

const resultsSchema = new mongoose.Schema({
  productId: Number,
  results: {
    type: [questionSchema]
  }
});

module.exports = {
  Question: mongoose.model('questions', questionSchema),
  Answer: mongoose.model('answers', answerSchema),
  Photo: mongoose.model('photos', photoSchema),
  Results: mongoose.model('results', resultsSchema)
};


