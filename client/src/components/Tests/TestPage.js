import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Query } from "react-apollo";
import { GET_TEST } from "../../queries";

import {
  ListGroup,
  ListGroupItem,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const newQuestions = [];

class TestPage extends Component {
  state = {
    index: 0,
    _id: ""
  };

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  goToNext = question => {
    const { index } = this.state;
    newQuestions.push(question);
    console.log(newQuestions);
    this.setState({ index: index + 1 });
  };

  handleChange = answer => {
    answer.isChecked = !answer.isChecked;
  };

  render() {
    const { match, session } = this.props;
    const { _id } = match.params;
    // console.log(session.getCurrentUser._id);
    return (
      <Query query={GET_TEST} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          // console.log(data.getTest.questions);
          const { title, questions } = data.getTest;
          const question = questions[this.state.index];
          if (this.state.index >= 0 && this.state.index < questions.length) {
            return (
              <div className="App">
                <h2>{title}</h2>
                <div>
                  <h2>{question.questionText}</h2>
                  <ListGroup>
                    <FormGroup>
                      {this.shuffleArray(question.answers)}
                      {question.answers.map((answer, index) => {
                        return (
                          <ListGroupItem key={index}>
                            <Label check>
                              <Input
                                type="radio"
                                name="answer"
                                onChange={() => this.handleChange(answer)}
                              />
                              {answer.answerText}
                            </Label>
                          </ListGroupItem>
                        );
                      })}
                    </FormGroup>
                  </ListGroup>
                  <button onClick={() => this.goToNext(question)}>next</button>
                </div>
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
