
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
            poll: []
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
  let choice,vote,pollList,voteSum=0,percent;

    if(this.state.poll.choices !=undefined){
      this.state.poll.choices.map((item)=>{

      voteSum += item.votes;
      });

      pollList = this.state.poll.choices.map((item,i)=>{
        choice = item.choice  ;
        vote = parseInt(item.votes);
        percent = ((vote / voteSum)*100).toFixed(2);

        return(
          <tr key={i}>
            <td>1</td>
            <td>{choice}</td>
            <td>{vote}</td>
            <td>{percent}</td>
          </tr>
        )
        });
    }

return(
<div>
  <div className="space-md" />
<h2 className="center">{this.state.poll.question}</h2>
  <div className="space-md" />

<div className="container">
  <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Choice</th>
        <th>Vote</th>
        <th>Percent</th>
      </tr>
    </thead>
    <tbody>
      {pollList}
    </tbody>
  </Table>
</div>


</div>
)
}
}

export default Home;
