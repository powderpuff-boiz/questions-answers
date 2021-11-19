const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const { Question, Answer, Photo } = require('./schema.js');
require('dotenv').config();
const questionsCSV = '/Users/michellekim/rpp30/questions-answers/database/questions.csv';
const answersCSV = '/Users/michellekim/rpp30/questions-answers/database/answers.csv';
const photosCSV = '/Users/michellekim/rpp30/questions-answers/database/answers_photos.csv';

//mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.REMOTE_MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect('mongodb://localhost/QnA', {useNewUrlParser: true, useUnifiedTopology: true});

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
      db.collection('answers').insertOne(
        { answer_id: Number(data['id']),
          question_id: Number(data['question_id']),
          body: data['body'],
          date: parsedDate.toISOString(),
          answerer_name: data['answerer_name'],
          email: data['answerer_email'],
          helpfulness: Number(data['helpful']),
          reported: Number(data['reported']),
          photos: []
        })
          .then(res => res)
          .catch(err => {
            console.log('Error importing data into answers', err)
          });
      // Answer.create({
      //   answer_id: Number(data['id']),
      //   question_id: Number(data['question_id']),
      //   body: data['body'],
      //   date: parsedDate.toISOString(),
      //   answerer_name: data['answerer_name'],
      //   email: data['answerer_email'],
      //   helpfulness: Number(data['helpful']),
      //   reported: Number(data['reported']),
      //   photos: []
      // });
      csvStream.resume();
    })
    .on('end', () => {
      //db.collection('answers').createIndex({ question_id: 1 });
      console.log('Finished importing answers');
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
      db.collection('answers').updateOne(
        { answer_id: Number(data['answer_id']) },
        { $push: { photos: {
          id: Number(data['id']),
          answer_id: Number(data['answer_id']),
          url: data['url']
        }}});
      // Answer.updateOne({ answer_id: Number(data['answer_id']) },
      //   { $push: { photos: {
      //     id: Number(data['id']),
      //     answer_id: Number(data['answer_id']),
      //     url: data['url']
      //   }}
      // });
      csvStream.resume();
    })
    .on('end', () => {

      console.log('Finished importing photos');
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
      db.collection('questions').insertOne({
        question_id: Number(data['id']),
        product_id: Number(data['product_id']),
        question_body: data['body'],
        question_date: parsedDate.toISOString(),
        asker_name: data['asker_name'],
        asker_email: data['asker_email'],
        question_helpfulness: Number(data['helpful']),
        reported: Number(data['reported']),
        answers: []
      })
        .then(res => res)
        .catch((err) => {
          console.log("Error inserting data into questions", err);
        });
      // Question.create({
      //   question_id: Number(data['id']),
      //   product_id: Number(data['product_id']),
      //   question_body: data['body'],
      //   question_date: parsedDate.toISOString(),
      //   asker_name: data['asker_name'],
      //   asker_email: data['asker_email'],
      //   question_helpfulness: Number(data['helpful']),
      //   reported: Number(data['reported']),
      //   answers: []
      // });
      csvStream.resume();
    })
    .on('end', () => {
      //db.collection('questions').createIndex({ product_id: 1 });
      console.log('Finished importing questions');
    });
  stream.pipe(csvStream);
};


const nextId = async (id) => {
  let sequence = await db.collection('photoCounter').findOneAndUpdate(
    { _id: 'id' },
    { $inc: { value: 1 } },
    { returnDocument: 'after' }
  );
  return sequence.value.value;
};


// ====== INVOKE IMPORT FUNCTIONS ====== //
// Note: importing via mongoose(.create) takes more time than mongodb(.insertOne)

// importAnswers();
// importPhotos();
// importQuestions();


// ====== IMPORT TIME: MONGODB VS MONGOOSE ====== //
/* Answers:
 *   MongoDB: 17 minutes
 *   Mongoose:
 *
 * Photos:
 *   MongoDB:
 *   Mongoose:
 *
 * Questions:
 *   MongoDB:
 *   Mongoose:
*/



module.exports = {
  importQ: importQuestions,
  importA: importAnswers,
  importP: importPhotos,
  nextId: nextId
};



