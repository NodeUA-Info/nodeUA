const { gql } = require('apollo-server-express');

const test = gql`
  type Answer {
    _id: ID
    answerText: String!
    isValid: Boolean!
  }

  input AnswerInput {
    answerText: String!
    isValid: Boolean!
  }

  type Question {
    _id: ID
    questionText: String!
    answers: [Answer]!
  }

  input QuestionInput {
    questionText: String!
    answers: [AnswerInput]!
  }

  type Test {
    _id: ID
    questions: [Question]!
  }

  extend type Query {
    getTests: [Test]
  }

  extend type Mutation {
    addTest(questions: [QuestionInput]!): Test
  }
`;

module.exports = test;