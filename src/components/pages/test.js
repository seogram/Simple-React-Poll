"use strict"
  import React from 'react';
  import {MenuItem, InputGroup, DropdownButton,Image,Thumbnail, Col, Row, Well, Panel,ProgressBar, Form ,FormControl,FormGroup, ControlLabel, Button,Label,Table,Glyphicon,Modal} from 'react-bootstrap';
  import {connect} from 'react-redux';
  import { Link } from 'react-router';
  import { browserHistory } from 'react-router'
  import {bindActionCreators} from 'redux';
  import {findDOMNode} from 'react-dom';
//  import {postBook, deleteBook, getBooks,resetForm,resetDelForm} from '../../actions/booksActions';
//  import {testUrl} from '../../actions/testUrl';
  import {getAllTests} from '../../actions/allTests';
//  import {loadMore} from '../../actions/loadMore'
  import axios from 'axios';
  import FormErrors from '../formErrors';
  import Loading from '../loading';
//  import LoadingModal from '../loadingModal';

  //import ReactLoading from 'react-loading';


class Test extends React.Component{


  constructor(props) {
          super(props);
          this.state = {
              url: '',
              strategy : 'desktop',
              validationState : 'null',
              formErrors :  '',
              urlValid : false,
              checkboxValid : false,
              formValid : false,
              submitBTN : false,
               isLoading : false,
               skipValue : 0,
               testItems : []
              // loadingModal : false
          }
      }
      componentDidMount(){
      this.props.getAllTests(this.state.skipValue);
      }

      componentWillReceiveProps(newProps){
        if(newProps.allTests!== this.state.testItems){
           this.setState({testItems : newProps.allTests});
          var  allTestArray = this.state.testItems;
          var newTestItems = this.props.allTests.map((newItems)=>{
             allTestArray.push(newItems);
             this.setState({testItems : allTestArray});
           });
        }
      }

  handleSubmit(e){
   if (e.key === 13 /* Enter */) {
  event.preventDefault();
}
      var strategy = this.state.strategy;
      var requestedUrl = this.state.url;
  //    this.setState({url: '',isLoading : true,loadingModal : true,submitBTN : false});
      findDOMNode(this.refs.url).value='';
      browserHistory.push({pathname :"/currentTest",query:{url :requestedUrl , strategy : strategy} });
  //    this.props.testUrl(requestedUrl,strategy);

  //  }
    }
  //  var urlNoProtocol = requestedUrl.replace(/^https?\:\/\//i, "");

  //  var location = Number(this.state.location);
//    var prefix = 'www.';
  //  if (urlNoProtocol.substr(0, prefix.length) !== prefix){
  //    var trimmedUrl = prefix + urlNoProtocol;
      //  this.props.testUrl(trimmedUrl,location);
      //  this.setState({
      //   url : trimmedUrl,
      //   isLoading : true
      // });
  //  }
    // else {
    //   this.props.testUrl(urlNoProtocol,location);
    //   this.setState({
    //    url : urlNoProtocol,
    //    isLoading : true
    //  });
    // }
  //  }

    getValidationState(urlField) {
      switch(urlField){
      case 'url' :
        var url = this.state.url;
        if (url == ''){
          return null
        }
        else if (!this.state.urlValid && url.length > 0) {
        return 'warning';
      }else  {
          return 'success';
        }
        break;
        case 'strategy' :
        var strategy = this.state.strategy;
        if(strategy == ''){
          return 'warning';
        }
        else if (strategy.length >0){
          return 'success'
        }
         default :
        break;
      }
      }

    handleChange(e) {
      this.setState({ url: e.target.value },()=>{
        this.handleSubmitBTN();
      });
     }

    handleSubmitBTN() {
        var value = this.state.url;
        console.log(value)

        var urlCheck = value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
        if (urlCheck == null || value == null ){
          this.setState({submitBTN : false , urlValid:false});
        }
        else if (urlCheck == null &&  value.length > 0) {
        this.setState({submitBTN : false});
      }else if (urlCheck !=null && value.length > 0 ) {
            this.setState({submitBTN : true, urlValid : true});
        }
    }

    strategyHandle(e){
      this.setState({strategy : e.target.value});
    }

    HandleMore(){
      var skip = (this.state.skipValue)+4;
      this.setState({skipValue : skip});
      this.props.getAllTests(skip);

    }

render(){

  //const allTestsList = this.props.allTests.map((testItems)=>{

      const allTestsList = this.state.testItems.map((testItems)=>{
      var  imgPath = 'images/'+testItems.desktop.screenshotPath;
      return (

        <Col xs={12} sm={6} md={3}  >
          <Thumbnail src={imgPath} width ='150' height = '150' >
            <p
               className='website_name'>{(testItems.desktop.targeturl.length>22)?(testItems.desktop.targeturl.substring(0,22)):(testItems.desktop.targeturl)}</p>

             <p style={{textAlign : 'center'}}><strong >{(testItems.desktop.targeturl).substring(0,30)}</strong></p>
               <p>PAGE SPEED SCORE :{testItems.desktop.score}</p>
               <p>CSS RESPONSE BYTES :{testItems.desktop.cssResponseBytes}</p>

        <Link to={"/result/"+testItems._id}>Details</Link>
        </Thumbnail>
        </Col>
      );
  });
  // var  imgPath = 'images/'+this.props.test.desktop.screenshotPath;
  // var s = Number(this.props.test.desktop.score);
  let isLoading = this.state.isLoading;
return(
  <Well style={{marginTop : '45px'}} className="centered">
    <Row >
    <Col xs={12} md={6} mdOffset={3} >

      </Col>
    </Row>
        {/* SEARCH FORM GOES HERE.....*/}
        <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <Form  onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}>
                <FormGroup controlId="url"   validationState={(this.props.loading==false)?(null):this.getValidationState('url')} >
                  <Col xs={12} sm={8} >
                <FormControl type="text" placeholder="Enter URL" ref="url" name="url"
                  onChange={this.handleChange.bind(this)} />
                  <FormControl.Feedback />
                  </Col>
              </FormGroup>
              <Col xs={12} sm={2}>
              <FormGroup controlId="formControlsSelect" validationState={(this.props.loading==false)?(null):this.getValidationState('strategy')}>
              <FormControl   componentClass="select" placeholder="select" ref="delete" onChange={this.strategyHandle.bind(this)} value={this.state.strategy}>
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>

              </FormControl>
              </FormGroup>
          </Col>
                <Col xs={12} sm={2} >
                  <Button
                    onClick={(!isLoading || this.props.loading==true)?(this.handleSubmit.bind(this)):(null) }
                    bsStyle={(!this.state.submitBTN)?('default'):('primary')}
                    disabled={!this.state.submitBTN} >
                    {(!isLoading || this.props.loading==true)?('Test it'):('Analyzing...')}
                   </Button>

               </Col>
            </Form>
        </Col>
        </Row>

<Row style={{marginTop : '25px'}}>
   <Col xs={12}>
    <Row>
      <h2 className='heading'>Latest Results</h2>
      {(this.props.allTestIsFetching==false)?(allTestsList):( <Loading/>)}
    </Row>

     <Row>
       <Button onClick={this.HandleMore.bind(this)}>Load more..</Button>

     </Row>

   </Col>
</Row>

</Well>
)
}
}

function mapStateToProps(state){
return {

loading : state.test.isLoading,
allTestIsFetching : state.allTests.allTestIsFetching,
//loadMore : state.loadMore.loadMore,
test : state.test.test,
allTests : state.allTests.allTests
}
}
function mapDispatchToProps(dispatch){
return bindActionCreators({
getAllTests}, dispatch)
}
export default connect(mapStateToProps,
mapDispatchToProps)(Test);
