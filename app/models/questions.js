const questions = require('../data/questions.json');

exports.findQuestionById = (questionId) => {
  let question = {};
  question = questions.filter( obj => obj.id === questionId );
  return question[0];
};

exports.question = (questionId, answerValue) => {

  if (!questionId)
    return null;

  let question = this.findQuestionById(questionId);

  if (answerValue !== undefined) {

    question.items.forEach((item) => {

      item.checked = false;

      if (question.type == 'single') {
        if (item.value == answerValue) {
          item.checked = true;
        }
      }

      if (question.type == 'multiple') {
        if (answerValue.indexOf(item.value) !== -1) {
          item.checked = true;
        }
      }

    });

  }

  return question;

}
