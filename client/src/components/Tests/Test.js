import React from "react";
import { ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const Test = ({ _id, title }) => (
  <ListGroupItem>
    <Link to={`/test/${_id}`}>
      <h4>{title}</h4>
    </Link>
  </ListGroupItem>
);

export default Test;
