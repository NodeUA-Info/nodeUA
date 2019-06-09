const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


// Instantiate a schema using mongoose Schema
const TestResultSchema = new Schema({
  testName: {
    type: String
  },
  results: {
    type: [Boolean]
  }
})

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String
  },
  testResults: {
    type: [TestResultSchema],
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
      return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(this.password, salt, (err, hash) => {
          if(err) return next(err);
          this.password = hash;
          next();
      })
  })
})

// #3 Create a model with mongoose model() method
module.exports = mongoose.model('User', UserSchema);