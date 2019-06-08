import React from "react";
import { Query } from "react-apollo";
import { GET_TESTS } from "../../queries";
import Test from "./Test";
import withAuth from "../withAuth";
// import { Container, ListGroup } from "reactstrap";

const TestList = ({ session }) => {
  return (
    <Query query={GET_TESTS}>
      {({ loading, data, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        console.log(data);
        if (!loading && data.getTests.length > 0) {
          return (
            <div className="test_container">
              <div className="test_list__header">
                <h2>Перевірка знань</h2>
                <p>
                  На цій сторінці ви можете протестувати свої знання з Node.js,
                  обравши один з тестів.
                </p>
              </div>
              <ul className="list_group">
                {data.getTests.map(test => (
                  <Test key={test._id} {...test} session={session} />
                ))}
              </ul>
            </div>
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
