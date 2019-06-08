import React from "react";
import { Query } from "react-apollo";
import { GET_CHAPTERS } from "../../queries";
import Chapter from "./Chapter";
import { ListGroup } from "reactstrap";

import "./styles/ChapterList.css";

const ChapterList = () => {
  return (
    <Query query={GET_CHAPTERS}>
      {({ loading, data, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        console.log(data);
        if (!loading && data.getChapters.length > 0) {
          return (
            <div className="chapter_list__container">
              <ol className="rectangle-list">
                {data.getChapters.map(chapter => (
                  <Chapter key={chapter._id} {...chapter} />
                ))}
              </ol>
            </div>
          );
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
