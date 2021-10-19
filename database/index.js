const.mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/recipes', {useNewUrlParser: true, useUnifiedTopology: true});


const questionsSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true
  },
  questions: [{
    question_id: {
      type: Number,
      required: true
    },
    question_body: {
      type: String,
      maxLength: 1000,
      required: true
    },
    question_date: {
      type: Date
    },
    asker_name: {
      type: String,
      minLength: 60,
      required: true
    },
    question_helpfulness: {
      type: Integer
    },
    reported: {
      type: Boolean
    },
    answers: [{
      id: {
        type: Number,
        required: true
      },
      body: {
        type: String,
        maxLength: 1000,
        required: true
      },
      date: {
        type: Date,
      },
      answerer_name: {
        type: String,
        required: true
      },
      helpfulness: {
        type: Number
      },
      photos: [{
        id: {
          type: Number,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }]
    }]
  }]
});

const Questions = mongoose.model('Questions', questionsSchema);

// functions to create and update data below