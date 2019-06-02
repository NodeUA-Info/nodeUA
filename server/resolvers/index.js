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

    getTest: async (root, { _id }, {Test}) => {
      const test = await Test.findOne({ _id });
      return test;
    }
  },


  Mutation: {
    addChapter: async (root, { title, content }, { Chapter }) => {
      // Create a new record in the database
      // Save the record and return it
      const newChapter = await new Chapter({ title: title, content: content }).save();
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
        password
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
    }
  }
};

module.exports = resolvers;