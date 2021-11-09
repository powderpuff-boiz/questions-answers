// const getResults = (results) => {
//   //console.log('test results', results);
//   let result = {
//     'product_id': results[0]['product_id'].toString(),
//     'results': []
//   };

//   for (let i = 0; i < results.length; i++) {
//     let currentQ = results[i];
//     delete currentQ.product_id;
//     if (currentQ.reported === 0) {
//       currentQ.reported = false;
//     } else {
//       currentQ.reported = true;
//     }
//     if (currentQ['answers'].length > 0) {
//       let formattedAnswers = {};
//       for (let j = 0; j < currentQ['answers'].length; j++) {
//         let currentA = currentQ.answers[j];
//         let photosArr = [];
//         if (currentA.photos.length > 0) {
//           for (let k = 0; k < currentA.photos.length; k++) {
//             let currentPhoto = currentA.photos[k];
//             photosArr.push(currentPhoto.url);
//           }
//         }
//         formattedAnswers[currentA.answer_id] = {
//           id: currentA.answer_id,
//           body: currentA.body,
//           date: currentA.date,
//           answerer_name: currentA.answerer_name,
//           helpfulness: currentA.helpfulness,
//           photos: photosArr
//         };
//       }
//       currentQ['answers'] = formattedAnswers;
//       result['results'].push(currentQ);
//     }
//   }
//   return result;
// };

// const updateResults = (questions, answers) => {
//   let result = {};
//   result['product_id'] = questions[0].product_id.toString();
//   result['results'] = [];
//   for (let i = 0; i < questions.length; i++) {
//     let currentQ = questions[i];
//     delete currentQ['_id'];
//     delete currentQ['asker_email'];
//     for (let j = 0; j < answers.length; j++) {
//       let currentA = answers[j];
//       if (currentQ.question_id === currentA.question_id) {
//         let ansObj = {};
//         delete currentA['_id'];
//         delete currentA['question_id'];
//         delete currentA['email'];
//         delete currentA['reported'];
//         // console.log('CURRENT ANSWER', currentA);
//         currentQ['answers'] = {};
//         currentQ['answers'][currentA.answer_id] = currentA;
//       }
//     }
//     result['results'].push(currentQ);
//   }
//   console.log('UPDATED RESULTS', result);
//   return result;
// }


// const formatQuestions = (questions) => {
//   let result = [];
//   questions.forEach(q => {
//     let question = {
//       question_id: q.question_id,
//       question_body: q.question_body,
//       question_date: q.question_date,
//       asker_name: q.asker_name,
//       question_helpfulness: q.question_helpfulness,
//       reported: Boolean(q.question.reported),
//       answers: []
//     };
//     result.push(question);
//   });
//   console.log('HELPER QUESTIONS', result);
//   return result;
// }


// const getAnswers = (questionId) => {
//   return new Promise((resolve, reject) => {
//     Answer.find({ question_id: questionId })
//       .then((answers) => {
//         console.log('HELPER ANSWERS', answers);
//         resolve(answers);
//       });
//   })
// }

// module.exports = {
//   getResults: getResults,
//   updateResults: updateResults,
//   formatQuestions: formatQuestions
// };