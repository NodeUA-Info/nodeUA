import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";
import {
  // Container,
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
  password: ""
};

class SignIn extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.signinUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };
  render() {
    const { username, password } = this.state;
    return (
      <div className="form_container">
        <div className="form_group">
          <h2 className="form_title">Вхід</h2>
          <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
            {(signinUser, { data, loading, error }) => {
              return (
                <Form
                  className="form"
                  onSubmit={event => this.handleSubmit(event, signinUser)}
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
                  <Button
                    className="form_btn"
                    outline
                    color="success"
                    disabled={loading || this.validateForm()}
                  >
                    Вхід
                  </Button>
                  {error && <Error error={error} />}
                </Form>
              );
            }}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
