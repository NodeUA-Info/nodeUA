// #1 Import the model created with mongoose


// #2 Create resolver functions to handle GraphQL queries
/**
 * Query resolver "chapters" must return values in response to
 * the query "chapters" in GraphQL schema.
 */
const resolvers = {
  Query: {
    // Query which returns posts list
    getChapters: async (root, args, { Chapter }) => {
      const allChapters = await Chapter.find();
      return allChapters;
    }
  },

  /**
   * Mutation resolver addPost creates a new document in MongoDB
   * in response to the "addPost" mutation in GraphQL schema.
   * The mutation resolvers must return the created object.
   */
  Mutation: {
    addChapter: async (root, { title, content }, { Chapter }) => {
      // Create a new record in the database
      // Save the record and return it
      const newChapter = await new Chapter({ title: title, content: content }).save();
      return newChapter;
    }
  }
};

module.exports = resolvers;