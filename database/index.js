const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const { Question, Answer, Photo, Results } = require('./dbModels.js');
const questionsCSV = '/Users/michellekim/rpp30/questions-answers/database/questions.csv';
const answersCSV = '/Users/michellekim/rpp30/questions-answers/database/answers.csv';
const photosCSV = '/Users/michellekim/rpp30/questions-answers/database/answers_photos.csv';


mongoose.connect('mongodb://localhost/QnA', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', () => {
  console.log('DB connection failed');
});
db.once('open', () => {
  console.log('DB connection success');
});

// ====== TESTING AGGREGATE ===== //

// const aggregateQuestions = () => {
//   let pipeline = [
//     { $match: { 'product_id': 1 } },
//     { $limit: 2 }
//   ];
//   db.collection('questions').aggregate(pipeline).toArray()
//     .then(results => {
//       console.log('CHECKING AGGREGATE RESULTS', results);
//     })
//     .catch(err => {
//       console.log('AGGREGATE FAIL', err);
//     });
// };


// ===== IMPORT ANSWERS ===== //

const importAnswers = () => {
  let stream = fs.createReadStream(answersCSV);
  let csvData = [];
  let csvStream = fastcsv
    .parse({ headers: true, skipRows: 0 })
    .on('data', (data) => {
      csvStream.pause();
      db.collection('answers').insertOne({
        id: Number(data['answer_id']),
        questionId: Number(data['question_id']),
        body: data['body'],
        date: new Date(data['date']),
        name: data['name'],
        email: data['email'],
        reported: Number(data['reported']),
        helpfulness: Number(data['helpfulness']),
        photos: []
      });
      csvStream.resume();
    })
    .on('end', () => {
      console.log('stream is done');
    });
  stream.pipe(csvStream);
};

// importAnswers();



// ===== IMPORT PHOTOS ===== //

const importPhotos = () => {
  let stream = fs.createReadStream(photosCSV);
  let csvData = [];
  let csvStream = fastcsv
    .parse({ headers: true, skipRows: 0 })
    .on('data', (data) => {
      csvStream.pause();
      db.collection('answers').updateOne(
        { id: Number(data['answer_id']) },
        { $push: { photos: {
          id: Number(data['photo_id']),
          answerId: Number(data['answer_id']),
          url: data['url']
        }}});
      csvStream.resume();
    })
    .on('end', () => {
      console.log('stream is done');
    });
  stream.pipe(csvStream);
};

//importPhotos();



// ===== IMPORT QUESTIONS ===== //

const importQuestions = () => {
  let stream = fs.createReadStream(questionsCSV);
  let csvData = [];
  let csvStream = fastcsv
    .parse({ headers: true, skipRows: 0 })
    .on('data', (data) => {
      csvStream.pause();
      db.collection('questions').insertOne({
        id: Number(data['question_id']),
        productId: Number(data['product_id']),
        body: data['body'],
        date: new Date(data['date']),
        name: data['name'],
        email: data['email'],
        reported: Number(data['reported']),
        helpfulness: Number(data['helpfulness']),
        answers: []
      });
      csvStream.resume();
    })
    .on('end', () => {
      console.log('stream is done');
    });
  stream.pipe(csvStream);
};

//importQuestions();




// ===== CREATE RESULTS COLLECTION ===== //

const gatherResults = () => {
  // reference: results schema
  // input: product ID to grab questions
  // insert into results collection:
  // > questions document with nested answer documents ($push)
  let pipeline = [];

  db.collection('results').insertMany();
};



// ======= USING CSVTOJSON ======= //
// const arr = [];
// csvtojson().fromFile(photosCSV).then(source => {
//   for (var i = 0; i < source.length; i++) {
//     let oneRow = {
//       id: source[i]["id"],
//       answer_id: source[i]["answer_id"],
//       url: source[i]["url"]
//     };
//     arr.push(oneRow);
//   }

//   let collection = db.collection('photos');
//   collection.insertMany(arr, (err, result) => {
//     if (err) {
//       console.log('err', err);
//     } else if (result) {
//       console.log('Import CSV into DB success');
//     }
//   });
// });


// const arr = [];
// csvtojson().fromFile(answersCSV).then(source => {
//   for (var i = 0; i < source.length; i++) {
//     let oneRow = {
//       id: source[i]["id"],
//       question_id: source[i]["question_id"],
//       body: source[i]["body"],
//       date: source[i]["date_written"],
//       name: source[i]["answerer_name"],
//       email: source[i]["answerer_email"],
//       reported: source[i]["reported"],
//       helpfulness: (source[i]["helpful"])
//     };
//     arr.push(oneRow);
//   }

//   let collection = db.collection('answers');
//   collection.insertMany(arr, (err, result) => {
//     if (err) {
//       console.log('err', err);
//     } else if (result) {
//       console.log('Import CSV into DB success');
//     }
//   });
// });


// const arr = [];
// csvtojson().fromFile(questionsCSV).then(source => {
//   for (var i = 0; i < source.length; i++) {
//     let oneRow = {
//       id: source[i]["id"],
//       product_id: source[i]["product_id"],
//       body: source[i]["body"],
//       date: source[i]["date_written"],
//       name: source[i]["asker_name"],
//       email: source[i]["asker_email"],
//       reported: source[i]["reported"],
//       helpfulness: source[i]["helpful"]
//     };
//     arr.push(oneRow);
//   }
//   //console.log('checking for array', arr);
//   //let collectionName = 'questions';
//   let collection = db.collection('questions');
//   collection.insertMany(arr, (err, result) => {
//     if (err) {
//       console.log('err')
//     } else if (result) {
//       console.log('Import CSV into database successfully');
//     }
//   });
// });