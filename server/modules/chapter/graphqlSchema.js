// #1 Import the gql method from apollo-server-express
const { gql } = require('apollo-server-express');

// #2 Construct a schema with gql and using the GraphQL schema language
const typeDefs = gql`
 #3 Define the respective type with three fields
 # Note that the _id is created automatically by mongoose
  type Chapter {
    _id: ID,
    title: String,
    content: String
  },
  #4 Define the query type that must respond to 'chapters' query
  type Query {
    getChapters: [Chapter]
  }
  #5 Define a mutation to add new posts with two required fields
   type Mutation {
     addChapter(title: String!, content: String!): Chapter,
   }
`;

module.exports = typeDefs;