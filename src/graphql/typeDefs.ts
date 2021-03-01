const { gql } = require("apollo-server");

export default gql`
  type Query {
    getUsers: [User]
  }
  type User {
    username: String!
    email: String!
  }
`;
