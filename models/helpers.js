const getResults = (results) => {
  //console.log('test results', results);
  let result = {
    'product_id': results[0]['product_id'].toString(),
    'results': []
  };

  for (let i = 0; i < results.length; i++) {
    let currentQ = results[i];
    delete currentQ.product_id;
    if (currentQ.reported === 0) {
      currentQ.reported = false;
    } else {
      currentQ.reported = true;
    }
    if (currentQ['answers'].length > 0) {
      let formattedAnswers = {};
      for (let j = 0; j < currentQ['answers'].length; j++) {
        let currentA = currentQ.answers[j];
        let photosArr = [];
        if (currentA.photos.length > 0) {
          for (let k = 0; k < currentA.photos.length; k++) {
            let currentPhoto = currentA.photos[k];
            photosArr.push(currentPhoto.url);
          }
        }
        formattedAnswers[currentA.answer_id] = {
          id: currentA.answer_id,
          body: currentA.body,
          date: currentA.date,
          answerer_name: currentA.answerer_name,
          helpfulness: currentA.helpfulness,
          photos: photosArr
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