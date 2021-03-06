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
import Profile from "./components/Profile/Profile";
import ChapterPage from "./components/Chapters/ChapterPage";
import AddChapter from "./components/Chapters/AddChapter";
import AddTest from "./components/Tests/AddTest";
import TestPage from "./components/Tests/TestPage";
import TestList from "./components/Tests/TestList";
import withSession from "./components/withSession";

import "bootstrap/dist/css/bootstrap.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

library.add(faSignInAlt, faSignOutAlt, faUser, faUserPlus, faTimes);

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navigation session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
        <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
        <Route path="/test/add" render={() => <AddTest refetch={refetch} />} />
        <Route
          path="/chapter/add"
          render={() => <AddChapter refetch={refetch} />}
        />
        <Route path="/chapters/:_id" component={ChapterPage} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        <Route path="/tests" render={() => <TestList session={session} />} />
        <Route
          path="/test/:_id"
          render={() => <TestPage session={session} />}
        />
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
