import React, { Fragment } from "react";
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
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import withSession from "./components/withSession";

import "bootstrap/dist/css/bootstrap.min.css";

const Root = () => (
  <Router>
    <Fragment>
      <Navigation />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);
