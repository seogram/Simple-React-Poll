"use strict"
import React from 'react'
import {Row,Col,Button } from 'react-bootstrap';

export class Footer extends React.Component{
  render(){
    return(
      <footer className="footer text-center">
      <div className="container">
      <p className="footer-text">@2017 All Rights Reserved </p>
      </div>
      </footer>

    );
  }
}
