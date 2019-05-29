import React from "react";
import { withRouter } from "react-router-dom";

const ChapterPage = ({ match }) => {
  const { _id } = match.params;
  return <div>Chapter Page</div>;
};

export default withRouter(ChapterPage);
