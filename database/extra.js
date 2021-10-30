// ====== IMPORT QUESTIONS ====== //

db.collection('questions').insertOne({
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

// let parsedDate = new Date(Number(data['date_written']));
// db.collection('results').updateOne(
//   { product_id: Number(data['product_id']) },
//   { $push: { results: {
//       question_id: Number(data['id']),
//       product_id: Number(data['product_id']),
//       question_body: data['body'],
//       question_date: parsedDate.toISOString(),
//       asker_name: data['asker_name'],
//       asker_email: data['asker_email'],
//       reported: Number(data['reported']),
//       question_helpfulness: Number(data['helpful']),
//       answers: []
//     }}},
//   { upsert: true });
// .then((res) => {
//   console.log('CHECKING FOR RES', res);
//   if (res !== null) {
//     let parsedDate = new Date(Number(data['date_written']));
//     db.collection('results').updateOne(
//       { product_id: Number(data['product_id']) },
//       { $push: { results: {
//         question_id: Number(data['id']),
//         product_id: Number(data['product_id']),
//         question_body: data['body'],
//         question_date: parsedDate.toISOString(),
//         asker_name: data['asker_name'],
//         asker_email: data['asker_email'],
//         reported: Number(data['reported']),
//         question_helpfulness: Number(data['helpful']),
//         answers: []
//       }}}
//     );
//   } else if (res === null) {
//     let parsedDate = new Date(Number(data['date_written']));
//     db.collection('results').insertOne({
//       product_id: Number(data['product_id']),
//       results: [{
//         question_id: Number(data['id']),
//         product_id: Number(data['product_id']),
//         question_body: data['body'],
//         question_date: parsedDate.toISOString(),
//         asker_name: data['asker_name'],
//         asker_email: data['asker_email'],
//         reported: Number(data['reported']),
//         question_helpfulness: Number(data['helpful']),
//         answers: []
//       }]
//     });
//   }
// })
// .catch((err) => {
//   console.error(err);
// });
// let parsedDate = new Date(Number(data['date_written']));
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


// ====== IMPORT ANSWERS ====== //

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

db.collection('answers').insertOne(
  { answer_id: Number(data['id']),
    question_id: Number(data['question_id']),
    body: data['body'],
    date: parsedDate.toISOString(),
    answerer_name: data['answerer_name'],
    email: data['answerer_email'],
    reported: Number(data['reported']),
    helpfulness: Number(data['helpful']),
    photos: []
  });



// ====== IMPORT PHOTOS ====== //

Answer.updateOne({ answer_id: Number(data['answer_id']) },
{ $push: { photos: {
  id: Number(data['id']),
  answer_id: Number(data['answer_id']),
  url: data['url']
}}});

db.collection('answers').updateOne(
  { answer_id: Number(data['answer_id']) },
  { $push: { photos: {
    id: Number(data['id']),
    answer_id: Number(data['answer_id']),
    url: data['url']
  }}});


// ====== MONGOIMPORT CLI ====== //
// Note: this method of importing doesn't allow any data transformation

// mongoimport mongodb://localhost:27017/QnA questions.csv -c questions --type csv --headerline
// mongoimport mongodb://localhost:27017/QnA answers.csv -c answers --type csv --headerline
// mongoimport mongodb://localhost:27017/QnA answers_photos.csv --type csv --headerline