"use strict"
  import React from 'react';
  import {MenuItem, InputGroup, DropdownButton,Image,Thumbnail, Col, Row, Well, Panel,ProgressBar, Form ,FormControl,FormGroup, ControlLabel, Button,Label,Table,Glyphicon,Modal} from 'react-bootstrap';
  import {connect} from 'react-redux';
  import {bindActionCreators} from 'redux';
  import {findDOMNode} from 'react-dom';
  import {postBook, deleteBook, getBooks,resetForm,resetDelForm} from '../../actions/booksActions';
  import {testUrl} from '../../actions/testUrl';
  import {getAllTests} from '../../actions/allTests';
  import axios from 'axios';
  import {FormErrors} from '../formErrors';
  import Loading from '../loading';
  import LoadingModal from '../loadingModal';

  //import ReactLoading from 'react-loading';


class Test extends React.Component{


  constructor(props) {
          super(props);
          this.state = {
              url: '',
              strategy : 'desktop',
              validationState : 'null',
              formErrors : {url : ''},
              urlValid : false,
              checkboxValid : false,
              formValid : false,
              submitBTN : false,
              isLoading : false,
              loadingModal : false
          }
      }
      componentDidMount(){
        setTimeout(this.props.getAllTests()
          , 1000)
      }

//       componentDidUpdate(prevProps, prevState) {
//   if (this.state.loadingModal > prevState.loadingModal) {
//     this.setState({loadingModal : false})
//   }
// }


  handleSubmit(){

  //  alert('loading');
    var strategy = this.state.strategy;
    var requestedUrl = this.state.url;
    // console.log('url',requestedUrl);

  //  let  urlCheck = requestedUrl.match((?i)http(s)?://.*);
  //  if (urlCheck == '' ){
  //    this.setState({submitBTN : false , urlValid:false});
  //  }else {

  this.setState({url : requestedUrl,isLoading : true,loadingModal : true});

  this.props.testUrl(requestedUrl,strategy);



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
    this.setState({ url: e.target.value });
    this.handleSubmitBTN();
     }

    handleSubmitBTN() {
      var value = this.state.url;
      var strategy = this.state.strategy;
      var urlCheck = value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
      if (value == '' ){
        this.setState({submitBTN : false , urlValid:false});
      }
      else if (urlCheck == null &&  value.length > 0) {
      this.setState({submitBTN : false});
      }else {
          this.setState({submitBTN : true, urlValid : true});
      }
    }
    strategyHandle(e){
      this.setState({strategy : e.target.value});
    }
render(){
   const allTestsList = this.props.allTests.map((testItems)=>{
      var  imgPath = 'images/'+testItems.desktop.screenshotPath;
      return (

        <Col xs={12} sm={6} md={3} key={testItems._id} >
          <Thumbnail src={imgPath} width ='150' height = '150'>
            <p
               className='website_name'>{(testItems.desktop.targeturl.length>22)?(testItems.desktop.targeturl.substring(0,22)):(testItems.desktop.targeturl)}</p>

        <p>PAGE SPEED SCORE :{testItems.desktop.score}</p>
        <p>HTML RESPONSE BYTES :{testItems.desktop.htmlResponseBytes}</p>
        <p>CSS RESPONSE BYTES :{testItems.desktop.cssResponseBytes}</p>
        <p>IMAGE RESPONSE BYTES :{testItems.desktop.imageResponseBytes}</p>
        <p>JS RESPONSE BYTES :{testItems.desktop.javascriptResponseBytes}</p>
        <p>JS RESPONSE BYTES :{testItems.desktop.javascriptResponseBytes}</p>

        </Thumbnail>
        </Col>

      );
  });


  var  imgPath = 'images/'+this.props.test.desktop.screenshotPath;
  var s = Number(this.props.test.desktop.score);
  let isLoading = this.state.isLoading;
return(
  <Well style={{marginTop : '45px'}} className="centered">
    <Row >
    <Col xs={12} md={6} mdOffset={3} >
        <div >
          <FormErrors formErrors={this.state.formErrors} />
        </div>
      </Col>
    </Row>
        {/* SEARCH FORM GOES HERE.....*/}
        <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <Form >
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
                  onClick={(!isLoading)?(this.handleSubmit.bind(this)):(null) }
                  bsStyle={(!this.state.submitBTN)?('default'):('primary')}
                  disabled={!this.state.submitBTN} >
                  {(!isLoading || this.props.loading==false)?('Test it'):('Analyzing...')}
                 </Button>
               </Col>
            </Form>
        </Col>
        </Row>
    <Row className={this.props.loading==false ? 'show' : 'hidden'}>
      <Panel>
        <Col xs={12} >
          <h3 className='heading'>Test Result for : {this.state.url} </h3>
          <Panel style={{marginTop : '45px'}}>
            <Col xs={6}>
              <p>PAGE TITLE : {this.props.test.desktop.title}</p>
              <p>PAGE SPEED SCORE :  <Label bsStyle={(this.props.test.desktop.score <90)?('warning'):('success')}>{this.props.test.desktop.score} </Label></p>
              <p>HTML RESPONSE BYTES : <Label>{this.props.test.desktop.htmlResponseBytes} </Label> </p>
              <p>CSS RESPONSE BYTES : <Label>{this.props.test.desktop.cssResponseBytes}</Label> </p>
              <p>IMAGE RESPONSE BYTES : <Label>{this.props.test.desktop.imageResponseBytes}</Label> </p>
              <p>JS RESPONSE BYTES : <Label>{this.props.test.desktop.javascriptResponseBytes}</Label> </p>

            </Col>
            <Col xs={6}>
              <div className='screenshot-macbook'>
                  <Image src ={imgPath} />
              </div>
            </Col>
          </Panel>
        </Col>

        <Col xs={12}>
          <Table striped bordered condensed hover>
             <thead>
               <tr>
                 <th>Analyzed Item</th>
                 <th>Summary</th>
                 <th>Imapct</th>
                 <th>is Optimized ?</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td>{this.props.test.desktop.LandingPageRedirectsName}</td>
                 <td>{this.props.test.desktop.LandingPageRedirectsSummary}</td>
                 <td>{this.props.test.desktop.LandingPageRedirectsImpact}</td>
                 <td>{(this.props.test.desktop.LandingPageRedirectsImpact > 0)?(<Image src='images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.test.desktop.EnableGzipCompressionName}</td>
                 <td>{this.props.test.desktop.EnableGzipCompressionSummary}</td>
                 <td>{(this.props.test.desktop.EnableGzipCompressionImpact)}</td>
                 <td style={{textAlign:'center'}}>{(this.props.test.desktop.EnableGzipCompressionImpact > 0)?(<Image src='images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.test.desktop.LeverageBrowserCachingName}</td>
                 <td>{this.props.test.desktop.LeverageBrowserCachingSummary}</td>
                 <td>{this.props.test.desktop.LeverageBrowserCachingImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.test.desktop.LeverageBrowserCachingImpact > 0)?(<Image src='images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.test.desktop.ServerResponseTimeName}</td>
                 <td>{this.props.test.desktop.ServerResponseTimeSummary}</td>
                 <td>{this.props.test.desktop.ServerResponseTimeImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.test.desktop.ServerResponseTimeImpact > 0)?(<Image src='images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.test.desktop.MinifyCssName}</td>
                 <td>{this.props.test.desktop.MinifyCssSummary}</td>
                 <td>{this.props.test.desktop.MinifyCssImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.test.desktop.MinifyCssImpact > 0)?(<Image src='images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.test.desktop.MinifyHTMLName}</td>
                 <td>{this.props.test.desktop.MinifyHTMLSummary}</td>
                 <td>{this.props.test.desktop.MinifyHTMLImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.test.desktop.MinifyHTMLImpact > 0)?(<Image src='images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.test.desktop.MinifyJavaScriptName}</td>
                 <td>{this.props.test.desktop.MinifyJavaScriptSummary}</td>
                 <td>{this.props.test.desktop.MinifyJavaScriptImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.test.desktop.MinifyJavaScriptImpact > 0)?(<Image src='images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>

               <tr>
                 <td>{this.props.test.desktop.MinimizeRenderBlockingName}</td>
                 <td>{this.props.test.desktop.MinimizeRenderBlockingSummary}</td>
                 <td>{this.props.test.desktop.MinimizeRenderBlockingImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.test.desktop.MinimizeRenderBlockingImpact > 0)?(<Image src='images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>

               <tr>
                 <td>{this.props.test.desktop.OptimizeImagesName}</td>
                 <td>{this.props.test.desktop.OptimizeImagesSummary}</td>
                 <td>{this.props.test.desktop.OptimizeImagesImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.test.desktop.OptimizeImagesImpact > 0)?(<Image src='images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>

               <tr>
                 <td>{this.props.test.desktop.PrioritizeVisibleContentName}</td>
                 <td>{this.props.test.desktop.PrioritizeVisibleContentSummary}</td>
                 <td>{this.props.test.desktop.PrioritizeVisibleContentImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.test.desktop.PrioritizeVisibleContentImpact >0)?(<Image src='images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>

               <tr>
                 <td>{this.props.test.desktop.PrioritizeVisibleContentName}</td>
                 <td>{this.props.test.desktop.PrioritizeVisibleContentSummary}</td>
                 <td>{this.props.test.desktop.PrioritizeVisibleContentImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.test.desktop.PrioritizeVisibleContentImpact > 0)?(<Image src='images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>

             </tbody>
           </Table>


    </Col>

      </Panel>
    </Row>

<Row style={{marginTop : '25px'}}>
   <Col xs={12}>

     <h2 className='heading'>Lates Results</h2>
     {(this.props.allTestIsFetching==false)?(allTestsList):( <Loading/>)}
     {/* allTestsList  */}
   </Col>
</Row>
<LoadingModal show={(this.props.loading == false)?(!this.state.loadingModal):(this.state.loadingModal)} />

</Well>
)
}
}

function mapStateToProps(state){
return {
books: state.books.books,
// msg : state.books.msg,
// style: state.books.style,
// validation : state.books.validation,
// delMsg : state.books.delMsg,
// delValidation : state.books.delValidation,
loading : state.test.isLoading,
allTestIsFetching : state.allTests.allTestIsFetching,
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
