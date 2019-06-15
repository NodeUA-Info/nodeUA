import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withAuth from "../withAuth";
import { Container, Button, Form, FormGroup, Input } from "reactstrap";
import { Mutation } from "react-apollo";
import { ADD_TEST } from "../../queries";
import Error from "../Error";

const questions = [];
let title = "";
let counter = 0;

const initialState = {
  questionText: "",
  answers: [
    { answerText: "", isValid: false, isChecked: false },
    { answerText: "", isValid: false, isChecked: false },
    { answerText: "", isValid: false, isChecked: false },
    { answerText: "", isValid: true, isChecked: false }
  ]
};

class AddTest extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleTitleChange = event => {
    const { value } = event.target;
    title = value;
  };

  handleQuestionChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleAnswerChange = e => {
    const { name, value } = e.target;
    const index = e.target.getAttribute("data-index");
    const { answers } = this.state;

    const newAnswersArr = JSON.parse(JSON.stringify(answers));
    newAnswersArr[index][name] = value;
    this.setState({ answers: newAnswersArr });
  };

  addQuestion = () => {
    const newState = Object.assign({}, this.state);
    questions.push(newState);
    counter = questions.length;
    this.clearState();
  };

  handleSubmit = (e, addTest) => {
    e.preventDefault();
    addTest().then(({ data }) => {
      console.log(data);
    });
    counter = 0;
    this.props.history.push("/tests");
  };

  // updateCache = (cache, { data: { addTest } }) => {
  //   const { getTests } = cache.readQuery({ query: GET_TESTS });

  //   cache.writeQuery({
  //     query: GET_TESTS,
  //     data: {
  //       getTests: [...getTests, addTest]
  //     }
  //   });
  // };

  render() {
    const { questionText, answers } = this.state;
    return (
      <Mutation
        mutation={ADD_TEST}
        variables={{ questions, title }}
        // update={this.updateCache}
      >
        {(addTest, { loading, error }) => {
          return (
            <div className="App">
              <Container className="form_container_test">
                <Form
                  className="form_test"
                  onSubmit={e => this.handleSubmit(e, addTest)}
                >
                  <FormGroup>
                    <h4 className="test_title">Назва тесту</h4>
                    <Input
                      type="text"
                      name="title"
                      onChange={this.handleTitleChange}
                      placeholder="Назва тесту"
                    />
                  </FormGroup>
                  <FormGroup>
                    <h4 className="test_title">Питання</h4>
                    <Input
                      type="textarea"
                      name="questionText"
                      onChange={this.handleQuestionChange}
                      value={questionText}
                      placeholder="Питання"
                    />
                  </FormGroup>
                  <h4 className="test_title">Варіанти відповідей</h4>
                  <FormGroup>
                    <Input
                      className="answer_input"
                      type="text"
                      name="answerText"
                      placeholder="Перший варіант"
                      data-index={0}
                      onChange={this.handleAnswerChange}
                      value={answers[0].answerText}
                    />
                    <Input
                      className="answer_input"
                      type="text"
                      name="answerText"
                      data-index={1}
                      placeholder="Другий варіант"
                      onChange={this.handleAnswerChange}
                      value={answers[1].answerText}
                    />
                    <Input
                      className="answer_input"
                      type="text"
                      name="answerText"
                      data-index={2}
                      placeholder="Третій варіант"
                      onChange={this.handleAnswerChange}
                      value={answers[2].answerText}
                    />
                    <h4 className="test_title">Правильна відповідь</h4>
                    <Input
                      className="answer_input"
                      type="text"
                      name="answerText"
                      data-index={3}
                      placeholder="Правильний варіант"
                      onChange={this.handleAnswerChange}
                      value={answers[3].answerText}
                    />
                  </FormGroup>
                  <div className="question_counter">
                    Всього питань: {counter}
                  </div>
                  <Button onClick={this.addQuestion} className="test_btn">
                    + Питання
                  </Button>
                  <br />
                  <Button disabled={loading} type="submit" className="test_btn">
                    Сформувати
                  </Button>
                  {error && <Error error={error} />}
                </Form>
              </Container>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(
  session => session && session.getCurrentUser.role === "admin"
)(withRouter(AddTest));
