import React from "react";
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const TestPage = ({ match }) => {
  const { _id } = match.params;
  return (
    <Query query={GET_TEST} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        // console.log(data.getTest.questions);
        const { title, questions } = data.getTest;
        return (
          <div className="App">
            <h2>{title}</h2>

            {questions.map((question, index) => (
              <div key={index}>
                <h1>{question.questionText}</h1>
                <ListGroup>
                  <FormGroup tag="fieldset">
                    {shuffleArray(question.answers)}
                    {question.answers.map((answer, index) => (
                      <ListGroupItem key={index}>
                        <Label check>
                          <Input type="radio" name="answer" />
                          {answer.answerText}
                        </Label>
                      </ListGroupItem>
                    ))}
                  </FormGroup>
                </ListGroup>
              </div>
            ))}

            <Button>Результат</Button>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(TestPage);
