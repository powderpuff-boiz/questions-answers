const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const { Question, Answer, Photo } = require('./dbModels.js');
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
  // importPhotos();
  //importQuestions();
  importAnswers();
  //aggregateQuestions();
});

// ====== TESTING AGGREGATE ===== //

const aggregateQuestions = () => {
  const pipeline = [
    { $match: { 'product_id': 1 } },
    { $group: { '_id': '$name'} },
    { $limit: 3 }
  ];
  db.collection('questions').aggregate(pipeline).toArray()
  .then(results => {
    console.log('CHECKING AGGREGATE RESULTS', results);
  })
  .catch(err => {
    console.log('AGGREGATE FAIL', err);
  });
}

// const pipeline = [
//   { $match: { 'product_id': 1 } },
//   { $limit: 2 }
// ];


const importPhotos = () => {
  let stream = fs.createReadStream(photosCSV, { highWaterMark: 24 });
  let csvData = [];
  let csvStream = fastcsv
    .parse({ headers: true })
    .on('data', (data) => {
      csvData.push({
        id: Number(data[0]),
        answer_id: Number(data[1]),
        url: data[2]
      });
    })
    .on('end', () => {
      console.log('stream is processing...');
      csvData.shift();
      db.collection('photos').insertMany(csvData, (err, result) => {
        if (err) {
          console.log('err')
        } else if (result) {
          console.log('Import CSV into database successfully');
        }
      });
    });
    stream.pipe(csvStream);
}

const importAnswers = () => {
  let stream = fs.createReadStream(answersCSV, { highWaterMark: 24 });
  let csvData = [];
  let csvStream = fastcsv
    .parse({ headers: true, skipRows: 1 })
    .on('data', (data) => {
      csvData.push({
        id: Number(data[0]),
        question_id: Number(data[1]),
        body: data[2],
        date: new Date(data[3]),
        name: data[4],
        email: data[5],
        reported: Number(data[6]),
        helpfulness: Number(data[7])
      });
    })
    .on('end', () => {
      console.log('stream is processing...');
      csvData.shift();
      db.collection('answers').insertMany(csvData, (err, result) => {
        if (err) {
          console.log('err')
        } else if (result) {
          console.log('Import CSV into database successfully');
        }
      });
    });
    stream.pipe(csvStream);
}

const importQuestions = () => {
  let stream = fs.createReadStream(questionsCSV, { highWaterMark: 24 });
  let csvData = [];
  let csvStream = fastcsv
    .parse({ headers: true })
    .on('data', (data) => {
      csvData.push({
        id: Number(data[0]),
        product_id: Number(data[1]),
        body: data[2],
        date: new Date(data[3]),
        name: data[4],
        email: data[5],
        reported: Number(data[6]),
        helpfulness: Number(data[7])
      });
    })
    .on('end', () => {
      console.log('stream is processing...');
      csvData.shift();
      db.collection('questions').insertMany(csvData, (err, result) => {
        if (err) {
          console.log('err')
        } else if (result) {
          console.log('Import CSV into database successfully');
        }
      });
    });
    stream.pipe(csvStream);
}




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