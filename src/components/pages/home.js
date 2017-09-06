

  import React from 'react';
  import {MenuItem, InputGroup, DropdownButton,Image,Thumbnail,Grid, Col, Row, Well, Panel,ProgressBar, Form ,FormControl,FormGroup, ControlLabel, Button,Label,Table,Glyphicon,Modal} from 'react-bootstrap';
  import {connect} from 'react-redux';
  import { Link } from 'react-router';
  import { browserHistory } from 'react-router'
  import {bindActionCreators} from 'redux';
  import {findDOMNode} from 'react-dom';
  var isUrl = require('is-url-superb');
  var pollsApi = require("../../pollsApi");


class Home extends React.Component{


  constructor(props) {
          super(props);
          this.state = {
            polls : []
          }
      }

  componentDidMount(){
    pollsApi.getQuestions().then((questions)=>{
      this.setState({
        polls: questions
      });
    });
  }


render(){

  const polls = this.state.polls.map((poll,i)=>{

  let  d = new Date(poll.published_at),
       newDate =  [d.getDate(), d.getMonth()+1, d.getFullYear()].join('/'),
      title = poll.question ,
      choices = poll.choices.length;


    return(
      <Col sm={6} md={3} key={i}>
        <Panel header={newDate}>

          <Link to={'detail/' + poll.url.split("/").pop()}>{title}</Link>
          <p style={{color:"#111"}}><small>Choices : {choices}</small></p>
        </Panel>
      </Col>
    );
  });





return(
<div>
  <header >
          <div className="header-content">
              <div className="inner">
                  <h1 >Polling App</h1>
                  <h1></h1>
                  <h4>Let us to collect best answers to important questions.</h4>
              </div>
          </div>
          <h3>Polls here</h3>
          <br/>
            <Grid>
    <Row className="show-grid">
    {polls}
    </Row>
  </Grid>
      </header>



</div>
)
}
}

export default Home;
