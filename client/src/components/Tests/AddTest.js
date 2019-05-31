import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddTest extends Component {
  state = {
    question: "",
    answers: [
      { answer1: "", isValid: false },
      { answer2: "", isValid: false },
      { answer3: "", isValid: false },
      { answer4: "", isValid: true }
    ]
  };

  handleQuestionChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleAnswersChange = e => {
  //   const { name, value } = e.target;
  //   const index = e.target.getAttribute("data-index");

  //   const newAnswers = Object.assign({}, this.state.answers[index], {
  //     [name]: value
  //   });
  //   // console.log(index);

  //   this.setState({
  //     answers: [
  //       ...this.state.answers.slice(0, index),
  //       newAnswers,
  //       ...this.state.answers.slice(index + 1)
  //     ]
  //   });
  // };

  handleAnswersChange = e => {
    const { name, value } = e.target;
    const index = e.target.getAttribute("data-index");

    const newAnswersArr = [...this.state.answers];
    newAnswersArr[index][name] = value;
    this.setState({ answers: newAnswersArr });
  };

  render() {
    const { question, answers } = this.state;
    // console.log(answers[1].answer2);
    return (
      <div className="App">
        <h2 className="App">Додати тест</h2>
        <Form className="form">
          <FormGroup>
            <Label for="exampleText">Питання</Label>
            <Input
              type="textarea"
              name="question"
              onChange={this.handleQuestionChange}
              value={question}
            />
          </FormGroup>
          <h2>Варіанти відповідей</h2>
          <FormGroup>
            <Input
              type="text"
              name="answer1"
              placeholder="Перший варіант"
              data-index={0}
              onChange={this.handleAnswersChange}
              value={answers[0].answer1}
            />
            <Input
              type="text"
              name="answer2"
              data-index={1}
              placeholder="Другий варіант"
              onChange={this.handleAnswersChange}
              value={answers[1].answer2}
            />
            <Input
              type="text"
              name="answer3"
              data-index={2}
              placeholder="Третій варіант"
              onChange={this.handleAnswersChange}
              value={answers[2].answer3}
            />
            <Label for="answer4">Правильна відповідь</Label>
            <Input
              type="text"
              name="answer4"
              data-index={3}
              placeholder="Четвертий варіант"
              onChange={this.handleAnswersChange}
              value={answers[3].answer4}
            />
          </FormGroup>
          <Button>+</Button>
          <Button>Сформувати</Button>
        </Form>
      </div>
    );
  }
}

export default AddTest;
