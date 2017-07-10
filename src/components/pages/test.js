"use strict"
import React from 'react';
import {MenuItem, InputGroup, DropdownButton,Image,Thumbnail, Col, Row, Well, Panel,ProgressBar, FormControl,FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBook, deleteBook, getBooks,resetForm,resetDelForm} from '../../actions/booksActions';
import {testUrl} from '../../actions/testUrl';
import {getAllTests} from '../../actions/allTests';
import axios from 'axios';

class Test extends React.Component{
  constructor(props) {
          super(props);
          this.state = {
              url: '',
              validationState : 'null'
          }
      }
      componentDidMount(){
        this.props.getAllTests();
      }

handleSubmit(){
  var requestedUrl=findDOMNode(this.refs.url).value;
  var urlNoProtocol = requestedUrl.replace(/^https?\:\/\//i, "");

console.log(this.state.isLoading);

var prefix = 'www.';
if (urlNoProtocol.substr(0, prefix.length) !== prefix){
  var trimmedUrl = prefix + urlNoProtocol;
   this.props.testUrl(trimmedUrl);
   this.setState({
    url : trimmedUrl,
    isLoading : true
  });
}else {
  this.props.testUrl(urlNoProtocol);
  this.setState({
   url : urlNoProtocol,
   isLoading : true
 });
}
}

getValidationState() {

  var url = this.state.url;
  var valid = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  if (url==''){
    return null;
  }else if (url.match(valid)) {
      return 'success';
  }else {
    return 'warning';
  }
}

handleChange(e) {
   this.setState({ url: e.target.value });
 }

render(){
  const allTestsList = this.props.allTests.map((testItems)=>{
    var  imgPath = 'images/'+testItems.imgPath;
    return (

      <Col xs={12} sm={6} md={3} key={testItems._id} >
        <Thumbnail src={imgPath}  >
          <h5 className='website_name'>{testItems.targeturl}</h5>
      <p>PAGE SPEED SCORE :{testItems.results.pagespeed_score}</p>
      <p>YSLOW SCORE :{testItems.results.yslow_score}</p>
      <p>PAGE LOAD TIME(ms) :{testItems.results.page_load_time}</p>
      <p>PAGE SIZE (bytes) :{testItems.results.page_bytes}</p>
      <p>NUMBER OF PAGE ELEMENTS :{testItems.results.page_elements}</p>
      </Thumbnail>
      </Col>

    );
  });
console.log(this.props.allTests);
var y = Number(this.props.test.results.yslow_score);
var s = Number(this.props.test.results.pagespeed_score);
let isLoading = this.state.isLoading;
return(
  <Well style={{marginTop : '45px'}} className="centered">
<Row >
<Col xs={6}  xsOffset={3}>
  <FormGroup controlId="url" validationState={(this.props.loading==false)?(null):this.getValidationState()} >
    <ControlLabel>Analyse your Website</ControlLabel>
       <InputGroup>
         <FormControl type="text" placeholder="Enter URL" ref="url"
           value={(this.props.loading==false)?(''):(this.state.url)}

           onChange={this.handleChange.bind(this)} />
         <FormControl.Feedback />
         <InputGroup.Button>
           <Button
             onClick={(!isLoading)?(this.handleSubmit.bind(this)):(null)}
             bsStyle="primary"
             disabled={(this.props.loading==false)?(false):(isLoading)} >
             {(!isLoading || this.props.loading==false)?('Test it'):('Analyzing...')}
            </Button>
          </InputGroup.Button>
       </InputGroup>
     </FormGroup>
</Col>
</Row>
<Row className={this.props.loading==false ? 'show' : 'hidden'}>
  <Panel>
    <Col xs={6}>
        <p>Yslow Score: {this.props.test.results.yslow_score}</p>
        <p>Page Speed Score: {this.props.test.results.pagespeed_score} </p>
        <p>Numebr of Page Elements: {this.props.test.results.page_elements} </p>
        <p>Fully Load Time: {this.props.test.results.fully_loaded_time} </p>
        <p>Page Load Time: {this.props.test.results.page_load_time} </p>
        <p>Page Size (Byte): {this.props.test.results.page_bytes} </p>

</Col>
<Col xs={4}>
<ProgressBar now={y} label={`${y}%`} bsStyle={(y>80)?("success"):("warning")} active />
<ProgressBar now={s} label={`${s}%`} bsStyle={(s>80)?("success"):("warning")}  active />
</Col>
  </Panel>
</Row>

<Row style={{marginTop : '25px'}}>
   <Col xs={12}>
     <h2 className='heading'>Lates Results</h2>
     {allTestsList}
   </Col>
</Row>
</Well>
)
}
}

function mapStateToProps(state){
return {
books: state.books.books,
msg : state.books.msg,
style: state.books.style,
validation : state.books.validation,
delMsg : state.books.delMsg,
delValidation : state.books.delValidation,
loading : state.test.isLoading,
test : state.test.test,
allTests : state.allTests.allTests
}
}
function mapDispatchToProps(dispatch){
return bindActionCreators({
getAllTests,testUrl}, dispatch)
}
export default connect(mapStateToProps,
mapDispatchToProps)(Test);
