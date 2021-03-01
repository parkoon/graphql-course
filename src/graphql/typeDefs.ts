import { gql } from "apollo-server";
export default gql`
  type Query {
    getUsers: [User]
    login(username: String!, password: String!): User
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
  }
  type User {
    username: String!
    email: String!
    token: String
    createdAt: String!
  }
`;
