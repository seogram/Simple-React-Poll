
  import React from 'react';
  import {MenuItem, InputGroup, DropdownButton,Image,Thumbnail, Col, Row, Well, Panel,ProgressBar, Form ,FormControl,FormGroup, ControlLabel, Button,Label,Table,Glyphicon,Modal} from 'react-bootstrap';
  import {connect} from 'react-redux';
  import { Link } from 'react-router';
  import { browserHistory } from 'react-router'
  import {bindActionCreators} from 'redux';
  import {findDOMNode} from 'react-dom';
  import HomeSubContent from '../home-sub-content';
  var isUrl = require('is-url-superb');
  var pollsApi = require("../../pollsApi");



class Home extends React.Component{


  constructor(props) {
          super(props);
          this.state = {
            poll: {}
          }
      }

      componentDidMount(){
        let id = this.props.params.id;
        pollsApi. getQuestion(id).then((poll)=>{
          this.setState({
            poll
          });
        });
      }


render(){

return(
<div>



</div>
)
}
}

export default Home;
