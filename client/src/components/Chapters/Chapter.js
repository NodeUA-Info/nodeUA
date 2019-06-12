import React from "react";
import { Link } from "react-router-dom";

const Chapter = ({ _id, title }) => (
  <li>
    <Link to={`/chapters/${_id}`} className="a_link">
      <h4 className="chapter_list_title">{title}</h4>
    </Link>
  </li>
);

export default Chapter;
