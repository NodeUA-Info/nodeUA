import React from "react";
import { Query } from "react-apollo";

import { GET_CHAPTERS } from "../../../queries";

const withChapters = Component => props => {
  return (
    <Query query={GET_CHAPTERS}>
      {({ loading, data }) => {
        console.log(data);
        return (
          <Component
            chaptersLoading={loading}
            chapters={data && data.getChapters}
            {...props}
          />
        );
      }}
    </Query>
  );
};

export default withChapters;
