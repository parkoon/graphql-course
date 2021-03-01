import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";

import { User } from "./entity/User";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx, // now, you can access context in resolver
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  createConnection()
    .then(async (connection) => {
      console.log("database connected");
    })
    .catch((error) => console.log(error));
});
