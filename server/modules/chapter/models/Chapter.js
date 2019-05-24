// #1 Import the constructor Schema and the model() method
// Note the use of ES6 desctructuring
const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

// #2 Instantiate a schema using mongoose Schema
const chapterSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// #3 Create a model with mongoose model() method
module.exports = mongoose.model('Chapter', chapterSchema);