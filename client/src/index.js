import React from "react";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./config/createApolloClient";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import App from "./components/App";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

import "bootstrap/dist/css/bootstrap.min.css";

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Root />
  </ApolloProvider>,
  document.getElementById("root")
);
