const getResults = (results) => {
  let result = {
    'product_id': results[0]['product_id'],
    'results': []
  };

  for (let i = 0; i < results.length; i++) {
    let currentQ = results[i];
    if (currentQ['answers'].length > 0) {
      let formattedAnswers = {};
      for (let j = 0; j < currentQ['answers'].length; j++) {
        let currentA = currentQ.answers[j];
        formattedAnswers[currentA.answer_id] = {
          id: currentA.answer_id,
          body: currentA.body,
          date: currentA.date,
          answerer_name: currentA.answerer_name,
          helpfulness: currentA.helpfulness,
          photos: currentA.photos
        };
      }
      currentQ['answers'] = formattedAnswers;
      result['results'].push(currentQ);
    }
  }
  return result;
};

module.exports = {
  getResults: getResults
};