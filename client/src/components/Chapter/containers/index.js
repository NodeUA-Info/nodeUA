import React, { Component } from "react";

import { withChapters } from "../providers";
import { ChapterList } from "../components";

import { Container } from "reactstrap";
import "../styles/styles.css";

class ChapterRoot extends Component {
  render() {
    const { chapters, chaptersLoading } = this.props;

    return (
      <Container>
        <h2 className="chapters-title">Chapters Module</h2>
        <hr />
        <ChapterList chaptersLoading={chaptersLoading} chapters={chapters} />
      </Container>
    );
  }
}

//  Wrap a component using the withChapters provider
//  to get data retrieved with GraphQL.

export default withChapters(ChapterRoot);
