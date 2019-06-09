const { gql } = require('apollo-server-express');

const user = gql`
  type TestResult {
    _id: ID
    testName: String
    results: [Boolean]
  }

  type User {
    _id: ID
    username: String! 
    password: String!
    email: String!
    joinDate: String
    role: String
    testResults: [TestResult]
  }

  type Token {
    token: String!
  }

  extend type Query {
    getCurrentUser: User
  }

  extend type Mutation {
    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(username: String!, password: String!): Token
  }
`;

module.exports = user;