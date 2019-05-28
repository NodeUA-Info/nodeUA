import React, { Component } from "react";
import { NavLink as RRNavLink, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
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
    return (
      <div className="main_nav">
        <div className="nav_container">
          <Navbar className="nav_content" light expand="md">
            <NavbarBrand tag={Link} to="/">
              <img src={logo} alt="logo" className="logo" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <NavbarUnAuth />
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
        Вхід
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={RRNavLink} to="/signup" className="nav_link">
        Реєстрація
      </NavLink>
    </NavItem>
  </Nav>
);

export default Navigation;
