import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

export const GET_CHAPTERS = gql`
  {
    chapters {
      _id
      title
      content
    }
  }
`;

const withChapters = Component => props => {
  return (
    <Query query={GET_CHAPTERS}>
      {({ loading, data }) => {
        return (
          <Component
            chaptersLoading={loading}
            chapters={data && data.chapters}
            {...props}
          />
        );
      }}
    </Query>
  );
};

export default withChapters;
