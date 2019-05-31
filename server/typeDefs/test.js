const { gql } = require('apollo-server-express');

const test = gql`
  type Answer {
    _id: ID
    text: String!
    isValid: Boolean!
  }

  type Question {
    _id: ID
    text: String!
    answers: [Answer]
  }

  type Test {
    _id: ID
    questions: [Question]
  }

  extend type Query {
    getTest: Test
  }

`;

module.exports = test;