const { gql } = require('apollo-server-express');

const queryRoot = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = queryRoot;