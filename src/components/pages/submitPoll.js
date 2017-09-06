
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
            choices : [],
            choice : ''

          }

      }

addChoice(e){
  let choices = this.state.choices;
  //choices.push(e.target.value);
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

  console.log('data',data);
  pollsApi.createQuestion(data).then((result)=>{
    this.setState({
      result
    });
  });
}

render(){

return(
<div>
  <div className="space-md" />

  <div className="space-md" />

<div className="container">

  <Form horizontal>
     <FormGroup controlId="formHorizontalEmail">
       <Col componentClass={ControlLabel} sm={2}>
         Question
       </Col>
       <Col sm={10}>
         <FormControl onChange={this.handleChange.bind(this)} type="text" placeholder="Question" name="question" />
       </Col>
     </FormGroup>

       <FormGroup controlId="formHorizontalPassword">

     <Col componentClass={ControlLabel} sm={2}>
       Choices
     </Col>
   </FormGroup>
      {this.state.choices.map((choice, index)=>{
        return (
            <Col sm={10}>
              <FormControl onChange={this.handleChangeChoice.bind(this)} type="text" placeholder="choice" name={'choice' + index}/>
            </Col>
        )
      })}

<Button onClick={this.addChoice.bind(this)}>add choice</Button>
   </Form>

   <Button onClick={this.submitPoll.bind(this)}>Submit Poll</Button>
</div>


</div>
)
}
}

export default Home;
