const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const { Question, Answer, Photo, Results } = require('./schema.js');
const questionsCSV = '/Users/michellekim/rpp30/questions-answers/database/questions.csv';
const answersCSV = '/Users/michellekim/rpp30/questions-answers/database/answers.csv';
const photosCSV = '/Users/michellekim/rpp30/questions-answers/database/answers_photos.csv';

//mongoose.connect('mongodb://localhost/QnA', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', () => {
  console.log('DB connection failed');
});
db.once('open', () => {
  console.log('DB connection success');
});


// ===== IMPORT ANSWERS ===== //
const importAnswers = () => {
  let stream = fs.createReadStream(answersCSV);
  let csvData = [];
  let csvStream = fastcsv
    .parse({ headers: true, skipRows: 0 })
    .on('data', (data) => {
      csvStream.pause();
      let parsedDate = new Date(Number(data['date_written']));
      Answer.create({
        answer_id: Number(data['id']),
        question_id: Number(data['question_id']),
        body: data['body'],
        date: parsedDate.toISOString(),
        answerer_name: data['answerer_name'],
        email: data['answerer_email'],
        reported: Number(data['reported']),
        helpfulness: Number(data['helpful']),
        photos: []
      });
      csvStream.resume();
    })
    .on('end', () => {
      console.log('stream is done');
    });
  stream.pipe(csvStream);
};


// ===== IMPORT PHOTOS ===== //
const importPhotos = () => {
  let stream = fs.createReadStream(photosCSV);
  let csvData = [];
  let csvStream = fastcsv
    .parse({ headers: true, skipRows: 0 })
    .on('data', (data) => {
      csvStream.pause();
      Answer.updateOne({ answer_id: Number(data['answer_id']) },
        { $push: { photos: {
          id: Number(data['id']),
          answer_id: Number(data['answer_id']),
          url: data['url']
        }}
      });
      csvStream.resume();
    })
    .on('end', () => {
      console.log('stream is done');
    });
  stream.pipe(csvStream);
};


// ===== IMPORT QUESTIONS ===== //
const importQuestions = () => {
  let stream = fs.createReadStream(questionsCSV);
  let csvData = [];
  let csvStream = fastcsv
    .parse({ headers: true, skipRows: 0 })
    .on('data', (data) => {
      csvStream.pause();
      let parsedDate = new Date(Number(data['date_written']));
      Question.create({
        question_id: Number(data['id']),
        product_id: Number(data['product_id']),
        question_body: data['body'],
        question_date: parsedDate.toISOString(),
        asker_name: data['asker_name'],
        asker_email: data['asker_email'],
        reported: Number(data['reported']),
        question_helpfulness: Number(data['helpful']),
        answers: []
      });
      csvStream.resume();
    })
    .on('end', () => {
      console.log('stream is done');
    });
  stream.pipe(csvStream);
};



// ====== INVOKE IMPORT FUNCTIONS ====== //
// Note: importing via mongoose(.create) takes more time than mongodb(.insertOne)

// importAnswers();
// importPhotos();
// importQuestions();



module.exports = {
  importQ: importQuestions,
  importA: importAnswers,
  importP: importPhotos
};



