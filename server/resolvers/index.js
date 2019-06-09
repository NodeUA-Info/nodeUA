const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
}

const resolvers = {
  Query: {
    // Query which returns chapters list
    getChapters: async (root, args, { Chapter }) => {
      const allChapters = await Chapter.find();
      return allChapters;
    },

    getChapter: async (root, { _id }, { Chapter }) => {
      const chapter = await Chapter.findOne({ _id });
      return chapter;
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null
      }
      const user = await User.findOne({ username: currentUser.username });
      return user;
    },

    getTests: async (root, args, { Test }) => {
      const allTests = await Test.find();
      return allTests;
    },

    getTest: async (root, { _id }, { Test }) => {
      const test = await Test.findOne({ _id });
      return test;
    }
  },


  Mutation: {
    addChapter: async (root, { title, uri }, { Chapter }) => {
      const newChapter = await new Chapter({ title: title, uri: uri }).save();
      return newChapter;
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username: username });
      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await new User({
        username,
        email,
        password,
        role: 'user',
        testResults: []
      }).save();
      return { token: createToken(newUser, process.env.SECRET, '24hr') }
    },

    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw new Error('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      return { token: createToken(user, process.env.SECRET, '24hr') }
    },

    addTest: async (root, { questions, title }, { Test }) => {
      const newTest = await new Test({ title, questions }).save();
      return newTest;
    },

    checkTest: async (root, { _id, title, questions }, { User }) => {
      const results = [];
      questions.map(question => {
        question.answers.map(answer => {
          if (answer.isValid) {
            if (answer.isChecked) {
              return results.push(true);
            } else {
              return results.push(false);
            }
          }
        })
      });
      console.log(results);

      let counter = 0;
      results.map(result => {
        
        if (result) {
          counter += 1;
        }
      })
      
      const score = counter / results.length * 100;
      console.log("score: ", score);

      const user = await User.findOne({ _id });

      console.log("user before update:", user);

      const { testResults } = user;

      let isNewResult = true;

      console.log("==============");
      let id;
      if (testResults.length === 0) {
        isNewResult = true;
      } else {
        testResults.map(testResult => {
          console.log("testResult.testName: ", testResult.testName);
          console.log("title: ", title)
          if (testResult.testName === title) {
            isNewResult = false;
            id = testResult._id;
          }
        });
      }

      console.log("isNewResult: ", isNewResult);
      console.log("==============");

      let testResult = {
        "results": results,
        "testName": title,
        "score": score
      };;

      if (isNewResult) {
        const updatedUser = await User.findByIdAndUpdate({ _id }, { "$addToSet": { "testResults": testResult } }, { "new": true }, function (err) {
          if (err) throw new Error(err)
          console.log("Successfully saved!");
        });
        console.log("user after update(isNewResult=true):", updatedUser);
      } else if (!isNewResult) {
        const updatedUser = await User.findOneAndUpdate({ 'testResults._id': id }, { '$set': { 'testResults.$.results': results, 'testResults.$.score': score } }, { "new": true }, function (err) {
          if (err) throw new Error(err)
          console.log("Successfully saved!");
        });
        console.log("user after update(isNewResult=false):", updatedUser);
      }
      return { results };
    },

    deleteTest: async (root, {_id}, {Test}) => {
      const deletedTest = await Test.findByIdAndDelete(_id);
      // console.log(deletedTest);
      return deletedTest;
    }
  }
};

module.exports = resolvers;