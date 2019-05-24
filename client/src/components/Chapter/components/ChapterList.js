import React, { Component } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";

export default class ChapterList extends Component {
  constructor(props) {
    super(props);

    this.showChapters = this.showChapters.bind(this);
  }

  showChapters() {
    const { chapters, chaptersLoading } = this.props;
    console.log(chapters)
    if (!chaptersLoading && chapters.length > 0) {
      return chapters.map(chapter => {
        return (
          <Card key={chapter._id} body outline className="chapter-card">
            <CardTitle>{chapter.title}</CardTitle>
            <CardBody>{chapter.content}</CardBody>
          </Card>
        );
      });
    } else {
      return (
        <div>
          <h3>No chapters available</h3>
        </div>
      );
    }
  }

  render() {
    return <div className="chapters-container">{this.showChapters()}</div>;
  }
}
