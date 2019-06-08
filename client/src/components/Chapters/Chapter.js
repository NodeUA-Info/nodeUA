import React from "react";
import { ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const Chapter = ({ _id, title }) => (
  <li>
    <Link to={`/chapters/${_id}`} className="a_link">
      <h4>{title}</h4>
    </Link>
  </li>
);

export default Chapter;
