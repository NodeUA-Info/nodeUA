const jwt = require('jsonwebtoken');


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
    }
  }
};

module.exports = resolvers;