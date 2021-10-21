const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fs = require('fs');
const path = require('path');
const csvtojson = require('csvtojson');
const fastcsv = require('fast-csv');
const Question = require('./dbModels.js');
const Answer = require('./dbModels.js');
const Photo = require('./dbModels.js');
const questionsCSV = '/Users/michellekim/rpp30/questions-answers/database/questions.csv';
const answersCSV = '/Users/michellekim/rpp30/questions-answers/database/answers.csv';
const photosCSV = '/Users/michellekim/rpp30/questions-answers/database/answers_photos.csv';
// const photosCSV = 'https://drive.google.com/file/d/1TbhRZ_sKBAu2Z0-sppE55D051G3MVP9I/view?usp=sharing';


mongoose.connect('mongodb://localhost/QnA', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', () => {
  console.log('DB connection failed');
});
db.once('open', () => {
  console.log('DB connection success');
});

// ======= PHOTOS FUNCTION ====== //
// let stream = fs.createReadStream(photosCSV);
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on('data', (data) => {
//     // console.log('stream is processing...');
//     csvData.push({
//       id: data[0],
//       answer_id: data[1],
//       url: data[2]
//     });
//   })
//   .on('end', () => {
//     console.log('stream is processing...');
//     csvData.shift();
//     let collection = db.collection('photos');
//     collection.insertMany(csvData, (err, result) => {
//       if (err) {
//         console.log('err')
//       } else if (result) {
//         console.log('Import CSV into database successfully');
//       }
//     });
//   });

//   stream.pipe(csvStream);




// ====== ANSWERS FUNCTION ====== //

// let stream = fs.createReadStream(answersCSV);
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on('data', (data) => {
//     // console.log('stream is processing...');
//     csvData.push({
//       id: data[0],
//       question_id: data[1],
//       body: data[2],
//       date: data[3],
//       name: data[4],
//       email: data[5],
//       reported: data[6],
//       helpfulness: data[7]
//     });
//   })
//   .on('end', () => {
//     console.log('stream is processing...');
//     csvData.shift();
//     let collection = db.collection('answers');
//     collection.insertMany(csvData, (err, result) => {
//       if (err) {
//         console.log('err')
//       } else if (result) {
//         console.log('Import CSV into database successfully');
//       }
//     });
//   });

//   stream.pipe(csvStream);





// ======= QUESTIONS FUNCTION ======= //

// let stream = fs.createReadStream(questionsCSV);
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on('data', (data) => {
//     // console.log('stream is processing...');
//     csvData.push({
//       id: data[0],
//       product_id: data[1],
//       body: data[2],
//       date: data[3],
//       name: data[4],
//       email: data[5],
//       reported: data[6],
//       helpfulness: data[7]
//     });
//   })
//   .on('end', () => {
//     console.log('stream is processing...');
//     csvData.shift();
//     let collection = db.collection('questions');
//     collection.insertMany(csvData, (err, result) => {
//       if (err) {
//         console.log('err')
//       } else if (result) {
//         console.log('Import CSV into database successfully');
//       }
//     });
//   });

//   stream.pipe(csvStream);



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