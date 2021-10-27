const db = require('./db.js');
const questions = require('../controllers/questions.js');
const answers = require('../controllers/answers.js');

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDB());
afterAll(async () => await db.closeDB());


// describe('Database functionality', () => {

//   it('first test', async done => {
//     let result;
//     expect().toBe();
//     done();
//   });

//   it('second test', async done => {
//     let result;
//     expect().toBe();
//     done();
//   });
// });