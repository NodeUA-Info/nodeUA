
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

    
  }
};

module.exports = resolvers;