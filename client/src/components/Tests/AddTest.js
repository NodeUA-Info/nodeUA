import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Mutation } from "react-apollo";
import { ADD_TEST } from "../../queries";
import Error from "../Error";

const questions = [];

const initialState = {
  questionText: "",
  answers: [
    { answerText: "", isValid: false },
    { answerText: "", isValid: false },
    { answerText: "", isValid: false },
    { answerText: "", isValid: true }
  ]
};

class AddTest extends Component {
  state = { ...initialState };

  // clearState = () => {
  //   this.setState({ ...initialState });
  // };

  handleQuestionChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleAnswersChange = e => {
    const { name, value } = e.target;
    const index = e.target.getAttribute("data-index");

    const newAnswersArr = [...this.state.answers];
    newAnswersArr[index][name] = value;
    this.setState({ answers: newAnswersArr });
  };

  addQuestion = () => {
    questions.push(this.state);
    console.log(questions);
    // this.clearState();
  };

  handleSubmit = (e, addTest) => {
    e.preventDefault();
    addTest().then(({ data }) => {
      console.log(data);
    });
  };

  render() {
    const { questionText, answers } = this.state;
    // console.log(answers[1].answer2);
    return (
      <Mutation mutation={ADD_TEST} variables={{ questions }}>
        {(addTest, { data, loading, error }) => {
          // console.log(data);
          return (
            <div className="App">
              <h2 className="App">Додати тест</h2>
              <Form
                className="form"
                onSubmit={e => this.handleSubmit(e, addTest)}
              >
                <FormGroup>
                  <Label for="exampleText">Питання</Label>
                  <Input
                    type="textarea"
                    name="questionText"
                    onChange={this.handleQuestionChange}
                    value={questionText}
                  />
                </FormGroup>
                <h2>Варіанти відповідей</h2>
                <FormGroup>
                  <Input
                    type="text"
                    name="answerText"
                    placeholder="Перший варіант"
                    data-index={0}
                    onChange={this.handleAnswersChange}
                    value={answers[0].answerText}
                  />
                  <Input
                    type="text"
                    name="answerText"
                    data-index={1}
                    placeholder="Другий варіант"
                    onChange={this.handleAnswersChange}
                    value={answers[1].answerText}
                  />
                  <Input
                    type="text"
                    name="answerText"
                    data-index={2}
                    placeholder="Третій варіант"
                    onChange={this.handleAnswersChange}
                    value={answers[2].answerText}
                  />
                  <Label for="answer4">Правильна відповідь</Label>
                  <Input
                    type="text"
                    name="answerText"
                    data-index={3}
                    placeholder="Четвертий варіант"
                    onChange={this.handleAnswersChange}
                    value={answers[3].answerText}
                  />
                </FormGroup>
                <Button onClick={this.addQuestion}>+</Button>
                <Button disabled={loading} type="submit">
                  Сформувати
                </Button>
                {error && <Error error={error} />}
              </Form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default AddTest;
