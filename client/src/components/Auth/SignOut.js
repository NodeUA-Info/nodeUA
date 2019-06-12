import React from "react";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApolloConsumer } from "react-apollo";

const handleSignOut = (client, history) => {
  localStorage.removeItem("token");
  client.resetStore();
  history.push("/");
};

const SignOut = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <span onClick={() => handleSignOut(client, history)}>
          Вийти <FontAwesomeIcon className="awesome_icon" icon="sign-out-alt" />
        </span>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(SignOut);
