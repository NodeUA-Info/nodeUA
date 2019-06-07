import React from "react";
import { Query } from "react-apollo";
import { GET_TESTS } from "../../queries";
import Test from "./Test";
import withAuth from "../withAuth";
import { Container, ListGroup } from "reactstrap";

const TestList = () => {
  return (
    <Query query={GET_TESTS}>
      {({ loading, data, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        console.log(data);
        if (!loading && data.getTests.length > 0) {
          return (
            <Container>
              <ListGroup>
                {data.getTests.map(test => (
                  <Test key={test._id} {...test} />
                ))}
              </ListGroup>
            </Container>
          );
        } else {
          return (
            <div>
              <h3>No tests available</h3>
            </div>
          );
        }
      }}
    </Query>
  );
};

export default withAuth(session => session && session.getCurrentUser)(TestList);
