import React, { Component } from "react";
import { NavLink as RRNavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import SignOut from "../Auth/SignOut";
import logo from "../../assets/logo.png";
import "./Navigation.css";

class Navigation extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { session } = this.props;
    return (
      <div className="main_nav">
        <div className="nav_container">
          <Navbar className="nav_content" light expand="md">
            <NavbarBrand tag={Link} to="/">
              <img src={logo} alt="logo" className="logo" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {session && session.getCurrentUser ? (
                <NavbarAuth />
              ) : (
                <NavbarUnAuth />
              )}
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

const NavbarUnAuth = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink tag={RRNavLink} to="/signin" className="nav_link">
        <span>
          Вхід <FontAwesomeIcon icon="sign-in-alt" />
        </span>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={RRNavLink} to="/signup" className="nav_link">
        <span>
          Реєстрація <FontAwesomeIcon icon="user-plus" />
        </span>
      </NavLink>
    </NavItem>
  </Nav>
);

const NavbarAuth = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink tag={RRNavLink} to="/test/add" className="nav_link">
        <span>+Тест</span>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={RRNavLink} to="/profile" className="nav_link">
        <span>
          Профіль <FontAwesomeIcon icon="user" />
        </span>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={RRNavLink} to="/signout" className="nav_link">
        <SignOut />
      </NavLink>
    </NavItem>
  </Nav>
);

export default Navigation;
