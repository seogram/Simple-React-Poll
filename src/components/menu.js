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
              <NavItem eventKey={1} href="#">FEATURES</NavItem>
              <NavItem eventKey={2} href="#">PACKAGES</NavItem>
              <NavItem eventKey={3} href="#">KNOWLEDGE BASE</NavItem>
            </Nav>

              {(!this.props.authenticated)?(
                <Nav pullRight>
                <LinkContainer to={{ pathname: '/signin' }}>
                <NavItem eventKey={1} href="#">LOG IN / REGISTER</NavItem>
                </LinkContainer>
              </Nav>
              )

                  :(<Nav pullRight>
                    <NavItem style={{float:'left'}}><img src="/images/navbar-profile.png" className="navbar-profile"/></NavItem>
                <NavDropdown eventKey={3} title="" id="basic-nav-dropdown" style={{float:'left'}}>
                  <LinkContainer to={{ pathname: '/dashboard' }}>
                  <MenuItem eventKey={3.1}>DASHBOARD</MenuItem>
                  </LinkContainer>
                  <LinkContainer to={{ pathname: '/signout' }}>
                  <MenuItem eventKey={3.2}>SIGN OUT</MenuItem>
                  </LinkContainer>
                </NavDropdown>
                </Nav>
              )
              }

          </Navbar.Collapse>
        </Navbar>
      );

  }
}

function mapStateToProps(state){
  return {
    authenticated : state.auth.authenticated
  }
}
export default connect(mapStateToProps) (Menu);
