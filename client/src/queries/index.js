import { gql } from "apollo-boost";

/* Chapter Queries */
export const GET_CHAPTERS = gql`
  {
    getChapters {
      _id
      title
      content
    }
  }
`;

export const GET_CHAPTER = gql`
  query($_id: ID!) {
    getChapter(_id: $_id) {
      _id
      title
      content
    }
  }
`;

/* Chapter Mutations */

/* User Queries */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
    }
  }
`;

/* User Mutations */

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

/* Tests Mutations */

export const ADD_TEST = gql`
  mutation($questions: [QuestionInput]!, $title: String!) {
    addTest(questions: $questions, title: $title) {
      _id
      title
      questions {
        _id
        questionText
        answers {
          _id
          answerText
          isValid
          isChecked
        }
      }
    }
  }
`;

// Tests Queries

export const GET_TESTS = gql`
  query {
    getTests {
      _id
      title
    }
  }
`;

export const GET_TEST = gql`
  query($_id: ID!) {
    getTest(_id: $_id) {
      _id
      title
      questions {
        _id
        questionText
        answers {
          _id
          answerText
          isValid
          isChecked
        }
      }
    }
  }
`;
