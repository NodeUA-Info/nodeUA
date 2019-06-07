import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Button, Form, FormGroup, Input } from "reactstrap";
import { Mutation } from "react-apollo";
import { ADD_CHAPTER, GET_CHAPTERS } from "../../queries";
import Error from "../Error";

const initialState = {
  title: "",
  uri: ""
};

class AddChapter extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e, addChapter) => {
    e.preventDefault();
    addChapter().then(({ data }) => {
      console.log(data);
    });
    this.props.history.push("/");
  };

  updateCache = (cache, { data: { addChapter } }) => {
    const { getChapters } = cache.readQuery({ query: GET_CHAPTERS });

    cache.writeQuery({
      query: GET_CHAPTERS,
      data: {
        getChapters: [...getChapters, addChapter]
      }
    });
  };

  render() {
    const { title, uri } = this.state;

    return (
      <Mutation
        mutation={ADD_CHAPTER}
        variables={{ uri, title }}
        update={this.updateCache}
      >
        {(addChapter, { data, loading, error }) => {
          return (
            <div className="App">
              <h2 className="form_title">Додати тест</h2>
              <Container className="form_container_test">
                <Form
                  className="form_test"
                  onSubmit={e => this.handleSubmit(e, addChapter)}
                >
                  <FormGroup>
                    <h4 className="test_title">Назва статті</h4>
                    <Input
                      type="text"
                      name="title"
                      onChange={this.handleChange}
                      value={title}
                    />
                  </FormGroup>
                  <FormGroup>
                    <h4 className="test_title">Додати посилання</h4>
                    <Input
                      type="text"
                      name="uri"
                      onChange={this.handleChange}
                      value={uri}
                    />
                  </FormGroup>
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

export default withRouter(AddChapter);
