import React from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import { Query } from "react-apollo";
import { GET_CHAPTERS } from "../../queries";

import "./styles/ChapterList.css";

const ChapterList = () => {
  return (
    <Query query={GET_CHAPTERS}>
      {({ loading, data }) => {
        console.log(data);
        if (!loading && data.getChapters.length > 0) {
          return data.getChapters.map(chapter => {
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
      }}
    </Query>
  );
};

export default ChapterList;
