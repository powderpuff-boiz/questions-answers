const getResults = (questions, answers) => {
  let result = {
    'product_id': questions[0]['product_id'].toString(),
    'results': []
  };

  questions.forEach(q => {
    let question = {
      question_id: q.question_id,
      question_body: q.question_body,
      question_date: q.question_date,
      asker_name: q.asker_name,
      question_helpfulness: q.question_helpfulness,
      reported: Boolean(q.reported),
      answers: {}
    };

    let formattedAnswers = {};
    for (var i = 0; i < answers.length; i++) {
      let currentArr = answers[i]; // array of answer docs
      if (currentArr.length >= 1) {
        currentArr.forEach(answer => {
          if (answer.question_id === q.question_id) {
            let photosArr = [];
            if (answer.photos.length > 0) {
              answer.photos.forEach(photo => {
                photosArr.push(photo.url);
              });
            }
            formattedAnswers[answer.answer_id] = {
              id: answer.answer_id,
              body: answer.body,
              date: answer.date,
              answerer_name: answer.answerer_name,
              helpfulness: answer.helpfulness,
              photos: photosArr
            };
            question.answers = formattedAnswers;
          }
        });
      }
    }
    result['results'].push(question);
  });
  return result;
};

module.exports = {
  getResults: getResults
};