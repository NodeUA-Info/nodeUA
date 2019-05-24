import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import apolloClient from "../config/createApolloClient";
import { Chapters } from "./Chapter";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Chapters />
      </ApolloProvider>
    );
  }
}

export default App;
