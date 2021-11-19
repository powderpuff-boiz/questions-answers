const { Question, Answer, Photo } = require('../database/schema.js');
const { nextId } = require('../database/index.js');

const a = {
  get: async (params) => {
    let answersList = await Answer.aggregate()
      .match({ question_id: params.id, reported: 0 })
      .limit(params.page * params.count)
      .project({ '_id': 0, 'question_id': 0, 'email': 0, 'reported': 0, 'photos.answer_id': 0 });
    return {
      question: params.id.toString(),
      page: params.page,
      count: params.count,
      results: answersList
    };
  },

  post: async (params) => {
    await nextId('answer')
      .then((answerId) => {
        let newDate = new Date();
        let finalDate = newDate.toISOString();
        return Answer.create({
          answer_id: answerId,
          question_id: params.question_id,
          body: params.body,
          date: finalDate,
          answerer_name: params.name,
          reported: 0,
          helpfulness: 0,
          photos: []
        })
          .then((res) => {
            if (params.photos === undefined) {
              return res;
            } else if (params.photos.length > 0) {
              let photos = params.photos;
              let photoDocs = [];
              photos.map((pic) => {
                nextId('photo')
                  .then(newId => {
                    let newDoc = {
                      id: newId,
                      answer_id: res.answer_id,
                      url: pic
                    };
                    photoDocs.push(newDoc);
                    Answer.updateOne(
                      { answer_id: res.answer_id },
                      { $push: { photos: { $each: photoDocs } } }
                    )
                      .then(result => {
                        return result;
                      })
                      .catch(err => {
                        console.log('Error updating answer', err);
                        return err;
                      });
                  })
                  .catch(err => {
                    console.log('Error getting new ID');
                  });
              });
            }
          })
          .catch((err) => {
            console.log('Error retrieving photo', err);
          });
      })
      .catch((err) => {
        console.log('Error creating answer', err);
        return err;
      });
  },

  helpful: async (params) => {
    let answerId = params;
    await Answer.findOneAndUpdate({ answer_id: answerId }, { $inc: {helpfulness: 1} })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  report: async (params) => {
    let answerId = params;
    await Answer.findOneAndUpdate({ answer_id: answerId }, { reported: 1 })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
};

module.exports = a;