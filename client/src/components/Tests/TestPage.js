import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withAuth from "../withAuth";

import { Query, Mutation } from "react-apollo";
import { GET_TEST } from "../../queries";
import { CHECK_TEST, GET_CURRENT_USER } from "../../queries";
import Result from "./Result";

import { Button } from "reactstrap";

const newQuestions = [];
let id = "";
let newScore = 0;

class TestPage extends Component {
  state = {
    index: 0,
    score: 0
  };

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  goToNext = (e, question, questions, checkTest) => {
    e.preventDefault();
    const { index } = this.state;
    newQuestions.push(question);
    this.setState({ index: index + 1 });

    if (index === questions.length - 1) {
      checkTest().then(({ data }) => {
        data.checkTest.results.map(result => {
          if (result === true) {
            newScore += 1;
          }
          this.setState({ score: newScore });
          return newScore;
        });
        newQuestions.length = 0;
        newScore = 0;
      });
      // this.props.history.push("/result");
    }
  };

  handleRadioChange = answers => {
    answers.map(answer => (answer.isChecked = false));
    // console.log("group change", answers);
  };

  // do it right!
  handleChange = (e, answer, answers) => {
    this.handleRadioChange(answers);
    answer.isChecked = !answer.isChecked;
  };

  render() {
    const { match, session } = this.props;
    const { _id } = match.params;
    id = session.getCurrentUser._id;
    const { index } = this.state;
    // console.log("new array : ", newQuestions);
    return (
      <Query query={GET_TEST} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          // console.log(data.getTest.questions);
          const { title, questions } = data.getTest;
          // const question = questions[index];

          const modifiedQuestions = [];
          questions.map(question => {
            const { answers: prevAnswers, questionText } = question;
            const answers = [];
            prevAnswers.map(prevAnswer => {
              const { answerText, isValid, isChecked } = prevAnswer;
              const answer = { answerText, isValid, isChecked };
              answers.push(answer);
              return answers;
            });
            const modifiedQuestion = { answers, questionText };
            modifiedQuestions.push(modifiedQuestion);
            return modifiedQuestions;
          });
          // console.log("modified questions: ", modifiedQuestions);

          const question = modifiedQuestions[index];
          // console.log("question: ", question, typeof question);
          let radioName = index;

          return (
            <Mutation
              mutation={CHECK_TEST}
              variables={{ _id: id, questions: newQuestions, title }}
              refetchQueries={() => [{ query: GET_CURRENT_USER }]}
            >
              {(checkTest, { loading, error }) => {
                // console.log({ _id: id, questions: newQuestions });
                if (index >= 0 && index < modifiedQuestions.length) {
                  return (
                    <div className="App">
                      <h2 className="test_list__header">{title}</h2>
                      <div>
                        <div className="answer_container">
                          <h2 className="question_text">
                            {question.questionText}
                          </h2>
                          <ul className="answer_list">
                            {this.shuffleArray(question.answers)}
                            {question.answers.map((answer, index) => {
                              return (
                                <li key={index} className="answer_li">
                                  <label>
                                    <input
                                      type="radio"
                                      className="form-radio"
                                      name={radioName}
                                      onChange={e =>
                                        this.handleChange(
                                          e,
                                          answer,
                                          question.answers
                                        )
                                      }
                                    />
                                    {answer.answerText}
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <Button
                          className="next_btn"
                          onClick={e =>
                            this.goToNext(
                              e,
                              question,
                              modifiedQuestions,
                              checkTest
                            )
                          }
                        >
                          Далі
                        </Button>
                      </div>
                    </div>
                  );
                } else {
                  const { score } = this.state;
                  return (
                    <div className="App">
                      <h2 className="test_list__header">{title}</h2>
                      <Result score={score} questionsCount={questions.length} />
                    </div>
                  );
                }
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(TestPage)
);
