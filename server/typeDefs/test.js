const { gql } = require('apollo-server-express');

const test = gql`
  type Answer {
    _id: ID
    answerText: String!
    isValid: Boolean!
    isChecked: Boolean!
  }

  input AnswerInput {
    answerText: String!
    isValid: Boolean!
    isChecked: Boolean!
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
    title: String!
    questions: [Question]!
  }


  type checkTestPayload {
    results: [Boolean]
  }

  extend type Query {
    getTests: [Test]
    getTest(_id: ID!): Test
  }

  extend type Mutation {
    addTest(questions: [QuestionInput]!, title: String!): Test
    checkTest(_id: ID!, title: String, questions: [QuestionInput]!): checkTestPayload
  }
`;

module.exports = test;