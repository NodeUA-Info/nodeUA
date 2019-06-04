import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Query, Mutation } from "react-apollo";
import { GET_TEST } from "../../queries";
import { CHECK_TEST } from "../../queries";
import Error from "../Error";

import {
  ListGroup,
  ListGroupItem,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const newQuestions = [];
let id = "";

class TestPage extends Component {
  state = {
    index: 0
  };

  // shuffleArray = array => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  // };

  goToNext = (e, question, questions, checkTest) => {
    e.preventDefault();
    const { index } = this.state;
    newQuestions.push(question);
    // console.log(newQuestions);
    this.setState({ index: index + 1 });

    if (index === questions.length - 1) {
      checkTest().then(({ data }) => {
        console.log(data);
      });
      // newQuestions.length = 0;
    }
  };

  // do it right!
  handleChange = (e, answer) => {
    // const { checked } = e.target;
    answer.isChecked = !answer.isChecked;
    // console.log(answer.isChecked);
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
            });
            const modifiedQuestion = { answers, questionText };
            modifiedQuestions.push(modifiedQuestion);
          });
          console.log("modified questions: ", modifiedQuestions);

          const question = modifiedQuestions[index];
          console.log("question: ", question);

          if (index >= 0 && index < modifiedQuestions.length) {
            return (
              <div className="App">
                <h2>{title}</h2>
                <Mutation
                  mutation={CHECK_TEST}
                  variables={{ _id: id, questions: newQuestions }}
                >
                  {(checkTest, { loading, error }) => {
                    console.log({ _id: id, questions: newQuestions });
                    return (
                      <div>
                        <h2>{question.questionText}</h2>
                        <ListGroup>
                          <FormGroup>
                            {/* {this.shuffleArray(question.answers)} */}
                            {question.answers.map((answer, index) => {
                              answer.isChecked = false;
                              return (
                                <ListGroupItem key={index}>
                                  <Label check>
                                    <Input
                                      type="radio"
                                      name="answer"
                                      onChange={e =>
                                        this.handleChange(e, answer)
                                      }
                                    />
                                    {answer.answerText}
                                  </Label>
                                </ListGroupItem>
                              );
                            })}
                          </FormGroup>
                        </ListGroup>

                        <Button
                          onClick={e =>
                            this.goToNext(
                              e,
                              question,
                              modifiedQuestions,
                              checkTest
                            )
                          }
                        >
                          next
                        </Button>
                        {error && <Error error={error} />}
                      </div>
                    );
                  }}
                </Mutation>
              </div>
            );
          } else {
            return <h1>Results</h1>;
          }
        }}
      </Query>
    );
  }
}

export default withRouter(TestPage);
