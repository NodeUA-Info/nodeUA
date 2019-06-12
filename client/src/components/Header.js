import React from "react";
import node_img from "../assets/header-title02.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header_container">
        <div className="header_content">
          <h1 className="header_title">Сучасний</h1>
          <img src={node_img} className="node_img" alt="dfdf" />
        </div>
        {/* <div className="header_sub">
          <h2 className="header_subtitle">Зміст</h2>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
