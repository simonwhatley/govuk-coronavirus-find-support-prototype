'use strict'

const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

const directoryPath = path.join(__dirname, '../data/')
const questions = yaml.safeLoad(fs.readFileSync(directoryPath + 'questions.yaml', 'utf8'))

exports.findQuestionById = (questionId) => {
  const question = questions.filter(obj => obj.id === questionId)
  return question[0]
}

exports.question = (questionId, answerValue) => {
  if (!questionId) {
    return null
  }

  const question = this.findQuestionById(questionId)

  if (answerValue !== undefined) {
    question.items.forEach((item) => {
      item.checked = false

      if (question.type === 'single') {
        if (item.value === answerValue) {
          item.checked = true
        }
      }

      if (question.type === 'multiple') {
        if (answerValue.indexOf(item.value) !== -1) {
          item.checked = true
        }
      }
    })
  }

  return question
}
