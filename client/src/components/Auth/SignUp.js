import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import Error from "../Error";

const initialState = {
  username: "",
  email: "",
  validate: {
    emailState: ""
  },
  password: "",
  passwordConfirmation: ""
};

class SignUp extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.signupUser.token);
      this.clearState();
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;
    return isInvalid;
  };

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    const { emailState } = this.state.validate;
    return (
      <Container className="App">
        <h2>Зареєструватися</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => {
            return (
              <Form
                className="form"
                onSubmit={event => this.handleSubmit(event, signupUser)}
              >
                <Col>
                  <FormGroup>
                    <Label>Логін</Label>
                    <Input
                      type="text"
                      name="username"
                      placeholder="username"
                      value={username}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="myemail@email.com"
                      value={email}
                      // valid={emailState === "has-success"}
                      invalid={emailState === "has-danger"}
                      onChange={e => {
                        this.validateEmail(e);
                        this.handleChange(e);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword">Пароль</Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="********"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword">Підтвердити пароль</Label>
                    <Input
                      type="password"
                      name="passwordConfirmation"
                      placeholder="********"
                      value={passwordConfirmation}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Button disabled={loading || this.validateForm()}>
                  Зареєструватися
                </Button>
                {error && <Error error={error} />}
              </Form>
            );
          }}
        </Mutation>
      </Container>
    );
  }
}

export default SignUp;
