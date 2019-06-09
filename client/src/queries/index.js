import { gql } from "apollo-boost";

/* Chapter Queries */
export const GET_CHAPTERS = gql`
  {
    getChapters {
      _id
      title
    }
  }
`;

export const GET_CHAPTER = gql`
  query($_id: ID!) {
    getChapter(_id: $_id) {
      _id
      title
      uri
    }
  }
`;

/* Chapter Mutations */

export const ADD_CHAPTER = gql`
  mutation($title: String!, $uri: String!) {
    addChapter(title: $title, uri: $uri) {
      _id
      title
      uri
    }
  }
`;

/* User Queries */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      role
      username
      email
      joinDate
      testResults {
        results
        testName
        score
      }
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

export const DELETE_TEST = gql`
  mutation($_id: ID!) {
    deleteTest(_id: $_id) {
      _id
    }
  }
`;

export const CHECK_TEST = gql`
  mutation($_id: ID!, $questions: [QuestionInput]!, $title: String!) {
    checkTest(_id: $_id, questions: $questions, title: $title) {
      results
    }
  }
`;

// Tests Queries

export const GET_TESTS = gql`
  {
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
