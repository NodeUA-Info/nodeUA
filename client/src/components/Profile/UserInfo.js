import React, { Fragment } from "react";
import { Table } from "reactstrap";

const UserInfo = ({ session }) => {
  console.log(session.getCurrentUser);
  const { testResults, username } = session.getCurrentUser;
  return (
    <Fragment>
      <div>
        <h2 className="test_list__header">{username}</h2>
        <div className="profile_container">
          <h3 className="profile_results_title">Результати тестування</h3>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>title</th>
                <th>score</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((result, index) => (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{result.testName}</td>
                  <td>100%</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {!testResults.length && (
            <p className="profile_attention">
              У вас поки що немає результатів.
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UserInfo;
