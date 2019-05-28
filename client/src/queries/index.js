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

/* Chapter Mutations */

/* User Queries */

/* User Mutations */

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;