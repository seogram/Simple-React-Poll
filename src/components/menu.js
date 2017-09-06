import React from 'react'
import {Nav , NavItem , Navbar ,NavDropdown ,Badge,MenuItem ,Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import {Link} from 'react-router';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
class Menu extends React.Component{

  render(){

    return (
      <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to ="/"><img src="/images/logo.png" width="120px"/></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to={{ pathname: '/submit' }}>
              <NavItem eventKey={1} >Submit Poll</NavItem>
              </LinkContainer>
            </Nav>
              
          </Navbar.Collapse>
        </Navbar>
      );

  }
}

export default Menu;
