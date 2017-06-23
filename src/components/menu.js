import React from 'react'
import {Nav , NavItem , Navbar ,Badge } from 'react-bootstrap';

export class Menu extends React.Component{
  render(){
    return (
      <Navbar  inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Book Store</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/about">About us</NavItem>
              <NavItem eventKey={2} href="/contact">Contact</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="/admin">Admin</NavItem>
              <NavItem eventKey={2} href="/cart">Your Cart
              <Badge className="badge">1</Badge></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}
