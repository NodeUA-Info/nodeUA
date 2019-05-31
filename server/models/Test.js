const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  isValid: {
    type: Boolean,
    required: true
  }
});

const QuestionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  answers: [AnswerSchema]
});

const TestSchema = new Schema({
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Test', TestSchema);