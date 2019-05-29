import React from "react";
import { withRouter } from "react-router-dom";

import { Query } from "react-apollo";
import { GET_CHAPTER } from "../../queries";

const ChapterPage = ({ match }) => {
  const { _id } = match.params;
  return (
    <Query query={GET_CHAPTER} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        console.log(data);
        return <div>Chapter Page</div>;
      }}
    </Query>
  );
};

export default withRouter(ChapterPage);
