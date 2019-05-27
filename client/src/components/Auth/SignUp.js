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

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <Container className="App">
        <h2>Зареєструватися</h2>
        <Mutation mutation={SIGNUP_USER}>
          {() => {
            return (
              <Form className="form">
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
                      onChange={this.handleChange}
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
                <Button>Зареєструватися</Button>
              </Form>
            );
          }}
        </Mutation>
      </Container>
    );
  }
}

export default SignUp;
