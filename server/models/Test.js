const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answerText: {
    type: String,
    required: true
  },
  isValid: {
    type: Boolean,
    required: true
  }
});

const QuestionSchema = new Schema({
  questionText: {
    type: String,
    required: true
  },
  answers: [AnswerSchema]
});

const TestSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Test', TestSchema);