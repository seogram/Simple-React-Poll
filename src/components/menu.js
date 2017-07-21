import React from 'react'
import {Nav , NavItem , Navbar ,Badge,MenuItem ,Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import {Link} from 'react-router';
import ReactDOM from 'react-dom';

class Menu extends React.Component{

  render(){
    return (
      <Navbar  inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to ="/"><Image src='images/logo.png' width='150'/></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to={{ pathname: '/about' }}>
              <NavItem eventKey={1}>About us</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer to={{ pathname: '/admin' }}>
              <NavItem eventKey={1} >Admin</NavItem>
              </LinkContainer>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Menu;
