const router = require('express').Router();
const { questions, answers } = require('../controllers');

router.route('/questions').get(questions.getQuestions);
router.route('/questions').post(questions.postQuestion);
router.route('/questions/:question_id/helpful').put(questions.markHelpful);
router.route('/questions/:question_id/report').put(questions.reportQuestion);

router.route('/questions/:question_id/answers').get(answers.getAnswers);
router.route('/questions/:question_id/answers').post(answers.postAnswer);
router.route('/answers/:answer_id/helpful').put(answers.markHelpful);
router.route('/answers/:answer_id/report').put(answers.reportAnswer);

module.exports = router;