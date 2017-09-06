
  import React from 'react';
  import {InputGroup, Col, Row, Well, Panel,ProgressBar, Form ,FormControl,FormGroup, ControlLabel,ButtonGroup , Button,Label,Table,Alert,Modal} from 'react-bootstrap';
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
            choices : [],
            choice : '',
            result : {},
            alertVisible : false
          }
      }

addChoice(e){
  let choices = this.state.choices;
  choices.push("rename");
  this.setState({choice : choices});
}

handleChange(e){
  this.setState({
    [e.target.name] : e.target.value
     });
}

handleChangeChoice(e){

  let offset = e.target.name.split("choice").pop();

  let choices = this.state.choices;

  if(choices[offset])
    choices[offset] = e.target.value;

  this.setState({
    choices
  });
}

submitPoll(e){

  let data = {question: this.state.question , choices : this.state.choice}

  pollsApi.createQuestion(data).then((result)=>{
    this.setState({
      alertVisible : true
    });
    setTimeout(()=>{this.setState({alertVisible : false})
  }, 2000);
  });
}

handleAlertDismiss() {
    this.setState({alertVisible: false});
  }


render(){


return(
<div>
 {this.state.alertVisible && <Alert bsStyle="success" onDismiss={this.handleAlertDismiss.bind(this)}>
 <h5 style={{textAlign : "center"}}>Your Poll has been submitted !</h5>
            </Alert>}
  <div className="space-md" />
  <div className="container ">

  <Form horizontal>
     <FormGroup controlId="formHorizontalEmail">
       <Col componentClass={ControlLabel} sm={2}>
         Question
       </Col>
       <Col sm={6}>
         <FormControl onChange={this.handleChange.bind(this)} type="text" placeholder="Question" name="question" />
       </Col>
     </FormGroup>

     <FormGroup>

        <Col componentClass={ControlLabel} sm={2}>

        </Col>
        <Col sm={6}>
          {this.state.choices.map((choice, index)=>{
            return (

                  <FormControl onChange={this.handleChangeChoice.bind(this)} type="text" placeholder="enter your choice" name={'choice' + index}/>
            )
          })}
        </Col>

     </FormGroup>
   </Form>
   <div className="Row">
       <Col  sm={6} smOffset={3}>
         <ButtonGroup>
           <Button className="btn.btn-primary btn-lg" onClick={this.addChoice.bind(this)}>add choice</Button>
           <Button className="btn-danger btn-lg" onClick={this.submitPoll.bind(this)}>Submit Poll</Button>
         </ButtonGroup>
       </Col>
   </div>
</div>

</div>
)
}
}

export default Home;
