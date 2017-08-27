"use strict"
import React from 'react'
import {Row,Col,Button } from 'react-bootstrap';

export class Footer extends React.Component{

  render(){

    return(
      <footer id="footer" >
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6 footer-text-left">
            <span className="footer-text">Copyright Seogram Inc 2017 &nbsp; | </span>&nbsp;&nbsp;&nbsp;
            <span><a href="#">Legal Notice</a></span>
          </div>
          <div className="col-xs-12 col-sm-6 footer-text-right">
            <ul className="list-inline">
              <li><a rel="nofollow" title="Twitter" href="#"><i className="icon-lg ion-social-linkedin-outline"></i></a>&nbsp;</li>

              <li><a rel="nofollow" href="#" title="Facebook"><i className="icon-lg ion-social-facebook-outline"></i></a>&nbsp;</li>

           </ul>

          </div>
        </div>

      </div>

      </footer>
    );
  }
}
