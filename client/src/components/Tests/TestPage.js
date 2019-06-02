import React from "react";
import { withRouter } from "react-router-dom";

import { Query } from "react-apollo";
import { GET_TEST } from "../../queries";

const TestPage = ({ match }) => {
  const { _id } = match.params;
  return (
    <Query query={GET_TEST} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        console.log(data);
        return <div>Test Page</div>;
      }}
    </Query>
  );
};

export default withRouter(TestPage);
