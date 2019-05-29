import React from "react";
import { ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const Chapter = ({ _id, title }) => (
  <ListGroupItem className="chapter-card">
    <Link to={`/chapters/${_id}`}>
      <h4>{title}</h4>
    </Link>
  </ListGroupItem>
);

export default Chapter;
