// #1 Import Express and Apollo Server
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

// #2 Import mongoose
const mongoose = require("./config/database");

// #3 Import GraphQL type definitions
const typeDefs = require("./modules/chapter/graphqlSchema");

// #4 Import GraphQL resolvers
const resolvers = require("./modules/chapter/resolvers");

// #5 Initialize an Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// #6 Initialize an Express application
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app, cors: corsOptions });

const port = process.env.PORT || 4444;

// #8 Set the port that the Express application will listen to
app.listen(port, () => {
  console.log(
    `Server running on http://localhost:${port}${server.graphqlPath}`
  );
});
