import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Result = ({ score, questionsCount }) => {
  let percentage = (score / questionsCount) * 100;
  return (
    <div className="">
      <div className="result_container">
        <h1>Ваш результат: {percentage}%</h1>
        <p>{`Ви відповіли правильно на ${score} з ${questionsCount} питань`}</p>
      </div>
      <Link to="/tests">
        <Button className="admin_link">
          <h4>Перейти до тестів</h4>
        </Button>
      </Link>{" "}
      <Link to="/profile">
        <Button className="admin_link">
          <h4>Перейти до кабінету</h4>
        </Button>
      </Link>
    </div>
  );
};

export default Result;
