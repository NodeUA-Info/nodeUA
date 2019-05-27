const { gql } = require('apollo-server-express');

// class UpperCaseDirective extends SchemaDirectiveVisitor {
//   visitFieldDefinition(field) {
//     const { resolve = defaultFieldResolver } = field;
//     field.resolve = async function (...args) {
//       const result = await resolve.apply(this, args);
//       if (typeof result === 'string') {
//         return result.toUpperCase();
//       }
//       return result;
//     };
//   }
// }
// directive @upper on FIELD_DEFINITION

const user = gql`
  

  type User {
    _id: ID
    username: String! 
    password: String!
    email: String!
    joinDate: String
  }

  type Token {
    token: String!
  }

  extend type Mutation {
    signupUser(username: String!, email: String!, password: String!): Token
  }
`;

module.exports = user;