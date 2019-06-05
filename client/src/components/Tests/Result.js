import React from "react";
import { Link } from "react-router-dom";

const Result = ({ score, questionsCount }) => {
  let percentage = (score / questionsCount) * 100;
  return (
    <div className="App">
      <h1>Ваш результат: {percentage}%</h1>
      <p>{`Ви відповіли правильно на ${score} питання з ${questionsCount} питань`}</p>
      <Link to="/tests">
        <h4>Перейти до тестів</h4>
      </Link>
      <Link to="/profile">
        <h4>Перейти до кабінету</h4>
      </Link>
    </div>
  );
};

export default Result;
