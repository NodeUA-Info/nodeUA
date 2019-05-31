import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddTest extends Component {
  state = {
    question: "",
    answers: [
      { answer1: "", isValid: false },
      { answer2: "", isValid: false },
      { answer3: "", isValid: false },
      { answer4: "", isValid: false }
    ]
  };

  handleQuestionChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleAnswersChange = e => {
    const { name, value } = e.target;
    const index = e.target.getAttribute("data-index");

    const newAnswers = Object.assign({}, this.state.answers[index], {
      [name]: value
    });
    // console.log(index);

    this.setState({
      answers: [
        ...this.state.answers.slice(0, index),
        newAnswers,
        ...this.state.answers.slice(index + 1)
      ]
    });
  };

  handleValidChange = event => {
    const { name, value } = event.target;
    console.log(name, ":", value);
  };

  render() {
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
            />
            <Input
              type="text"
              name="answer2"
              data-index={1}
              placeholder="Другий варіант"
              onChange={this.handleAnswersChange}
            />
            <Input
              type="text"
              name="answer3"
              data-index={2}
              placeholder="Третій варіант"
              onChange={this.handleAnswersChange}
            />
            <Input
              type="text"
              name="answer4"
              data-index={3}
              placeholder="Четвертий варіант"
              onChange={this.handleAnswersChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="valid">Правильна відповідь</Label>
            <Input type="select" name="valid" onChange={this.handleValidChange}>
              <option value={true}>Перший варіант</option>
              <option>Другий варіант</option>
              <option>Третій варіант</option>
              <option>Четвертий варіант</option>
            </Input>
          </FormGroup>
          <Button>+</Button>
          <Button>Сформувати</Button>
        </Form>
      </div>
    );
  }
}

export default AddTest;
