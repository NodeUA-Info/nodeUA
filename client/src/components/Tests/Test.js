import React from "react";
// import { ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import { DELETE_TEST, GET_TESTS } from "../../queries";

const handleDelete = deleteTest => {
  const confirmDelete = window.confirm(
    "Ви певні, що бажаєте видалити даний тест?"
  );

  if (confirmDelete) {
    deleteTest().then(({ data }) => {
      console.log(data);
    });
  }
};

const Test = ({ _id, title, session }) => (
  <li className="test_link">
    <div>
      <Link to={`/test/${_id}`}>
        <h4 className="test_title">{title}</h4>
      </Link>
    </div>
    <div>
      {session.getCurrentUser.roles.map(role => {
        if (role === "admin") {
          return (
            <Mutation
              mutation={DELETE_TEST}
              variables={{ _id }}
              key={_id}
              update={(cache, { data: { deleteTest } }) => {
                const { getTests } = cache.readQuery({
                  query: GET_TESTS
                });

                cache.writeQuery({
                  query: GET_TESTS,
                  data: {
                    getTests: getTests.filter(
                      test => test._id !== deleteTest._id
                    )
                  }
                });
              }}
            >
              {deleteTest => {
                return (
                  <span
                    className="delete-button"
                    onClick={() => handleDelete(deleteTest)}
                  >
                    <FontAwesomeIcon icon="times" />
                  </span>
                );
              }}
            </Mutation>
          );
        }
      })}
    </div>
  </li>
);

export default Test;
