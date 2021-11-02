// const supertest = require('supertest');
// const mongoose = require('mongoose');
// const app = require('../server/index.js');
// const { Question, Answer } = require('../database/schema.js');
// const q = require('../models/questions.js');

// beforeAll((done) => {
//   mongoose.connect('mongodb://localhost:27017/SDCtest',
//   { useNewUrlParser: true, useUnifiedTopology: true }, () => done());
// });

// afterEach((done) => {
//   mongoose.connection.db.dropDatabase(done);
// });

// afterAll((done) => {
//   mongoose.connection.close(done);
// });

// describe('HTTP requests', () => {

//   test('GET /qa/questions retrieves questions', async () => {
//     const newQ = await Question.create({
//       question_id: 222,
//       product_id: 223,
//       question_body: 'Asking question for testing',
//       question_date: new Date(),
//       asker_name: 'tester123',
//       asker_email: 'tester123@yahoo.com',
//       reported: 0,
//       question_helpfulness: 0
//     });

//     await supertest(app).get('/qa/questions?productId=223')
//       .expect(400)
//   });

//   test('GET /qa/questions/:question_id/answers retrieves answers', async () => {
//     const newA = await Answer.create({
//       answer_id: 22,
//       question_id: 222,
//       body: 'Testing for answers',
//       date: new Date(),
//       answerer_name: 'tester456',
//       reported: 0,
//       helpfulness: 0,
//       photos: []
//     });

//     await supertest(app).get('/qa/questions/222/answers')
//       .expect(200)
//       .then((res) => {
//         expect(res.body.question).toBe('222');
//         expect(res.body.page).toBe(1);
//         expect(res.body.count).toBe(5);
//       });
//   });


//   test('PUT /qa/questions/:question_id/helpful updates helpfulness', async () => {
//     const newQ = await Question.create({
//       question_id: 224,
//       product_id: 224,
//       question_body: 'Asking question for testing',
//       question_date: new Date(),
//       asker_name: 'tester123',
//       asker_email: 'tester123@yahoo.com',
//       reported: 0,
//       question_helpfulness: 0
//     });

//     await supertest(app).put('/qa/questions/224/helpful')
//       .expect(204)
//   });


//   test('PUT /qa/questions/:question_id/report updates report', async () => {
//     const newQ = await Question.create({
//       question_id: 225,
//       product_id: 225,
//       question_body: 'Asking question for testing',
//       question_date: new Date(),
//       asker_name: 'tester123',
//       asker_email: 'tester123@yahoo.com',
//       reported: 0,
//       question_helpfulness: 0
//     });

//     await supertest(app).put('/qa/questions/225/report')
//       .expect(204)
//   });


//   test('PUT /qa/answers/:answer_id/report updates report', async () => {
//     const newA = await Answer.create({
//       answer_id: 223,
//       question_id: 223,
//       body: 'Testing for answers',
//       date: new Date(),
//       answerer_name: 'tester456',
//       reported: 0,
//       helpfulness: 0,
//       photos: []
//     });

//     await supertest(app).put('/qa/answers/223/report')
//       .expect(204)
//   });


//   test('PUT /qa/answers/:answer_id/helpful updates helpfulness', async () => {
//     const newA = await Answer.create({
//       answer_id: 227,
//       question_id: 227,
//       body: 'Testing for answers',
//       date: new Date(),
//       answerer_name: 'tester456',
//       reported: 0,
//       helpfulness: 0,
//       photos: []
//     });

//     await supertest(app).put('/qa/answers/227/helpful')
//       .expect(204)
//   });



// });
