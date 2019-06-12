import React from "react";
import { Table } from "reactstrap";

const UserInfo = ({ session }) => {
  console.log(session.getCurrentUser);
  const { testResults } = session.getCurrentUser;
  return (
    <div className="profile_container">
      <h3 className="profile_results_title">Результати тестування</h3>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Назва тесту</th>
            <th>Результат</th>
          </tr>
        </thead>
        <tbody>
          {testResults.map((result, index) => (
            <tr key={index}>
              <th scope="row">{index}</th>
              <td>{result.testName}</td>
              <td>{result.score}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!testResults.length && (
        <p className="profile_attention">У вас поки що немає результатів.</p>
      )}
    </div>
  );
};

export default UserInfo;
