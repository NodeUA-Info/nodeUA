// #1 Import Express and Apollo Server
const express = require("express");
require("dotenv").config({ path: "variables.env" });
const { ApolloServer } = require("apollo-server-express");
const jwt = require('jsonwebtoken');

// #2 Import mongoose
const mongoose = require("./config/database");
const Chapter = require('./models/Chapter');
const User = require('./models/User');


// #3 Import GraphQL type definitions
const typeDefs = require("./typeDefs");

// #4 Import GraphQL resolvers
const resolvers = require("./resolvers/resolvers");


// #5 Initialize an Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req: { currentUser } }) => {
    // const token = req.headers.authorization;
    // const currentUser = getUser(token);
    return { Chapter, User, currentUser }
  }
});

// #6 Initialize an Express application
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

// Set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
})


// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app, cors: corsOptions });

const port = process.env.PORT || 4444;

// #8 Set the port that the Express application will listen to
app.listen(port, () => {
  console.log(
    `Server running on http://localhost:${port}${server.graphqlPath}`
  );
});
