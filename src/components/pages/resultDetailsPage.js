
  import React from 'react';
  import {MenuItem, InputGroup, DropdownButton,Image,Thumbnail, Col, Row, Well, Panel,ProgressBar, Form ,FormControl,FormGroup, ControlLabel, Button,Label,Table,Glyphicon,Modal,OverlayTrigger,Tooltip,Badge} from 'react-bootstrap';
  import {connect} from 'react-redux';
  import { Link } from 'react-router'
  import {bindActionCreators} from 'redux';
  import {findDOMNode} from 'react-dom';
  import {postBook, deleteBook, getBooks,resetForm,resetDelForm} from '../../actions/booksActions';
  import {testUrl} from '../../actions/testUrl';
  import {getAllTests} from '../../actions/allTests';
  import axios from 'axios';
  import {FormErrors} from '../formErrors';
  import Loading from '../loading';
  import LoadingModal from '../loadingModal';
  import {resultDetails} from '../../actions/resultDetails';

class resultDetailsPage extends React.Component{


  // constructor(props) {
  //         super(props);
  //         this.state = {
  //             url: '',
  //             strategy : 'desktop',
  //             validationState : 'null',
  //             formErrors : {url : ''},
  //             urlValid : false,
  //             checkboxValid : false,
  //             formValid : false,
  //             submitBTN : false,
  //             isLoading : false,
  //             loadingModal : false
  //         }
  //     }


      componentDidMount(){
       var testId = this.props.params.id;
       console.log(testId);
      this.props.resultDetails(testId)
      }

render(){

  const tooltipStatus = (<Tooltip id="tooltip">This defines whether your website is optimized for each specific rule. <strong>100% maans</strong> your completely optimized. </Tooltip>);

  const tooltipImapct = (<Tooltip id="tooltip">Each PageSpeed rule generates an impact number (an unbounded floating point value) that indicates the importance or priority of implementing the rule-result suggestions for the rule, relative to other rules. For instance, if enabling compression would save 1MB, while optimizing images would save 500kB, the Enable Compression rule would have an impact value that is twice that of the Optimize Images rule. An impact of zero indicates that there are no suggestions for improvement for that rule. </Tooltip>);

  var  imgPath = '/images/'+this.props.details.desktop.screenshotPath;
  var s = Number(this.props.details.desktop.score);

return(

  <Well style={{marginTop : '45px'}} className="centered">
    <Row className={this.props.resultDetailsLoaded==true ? 'show' : 'hidden'}>
      <h3 className='heading'>Test Result for : {this.props.details.desktop.targeturl} </h3>
      <Panel style={{marginTop : '5px' , marginBottom : '5px' , paddingTop : '15px' , paddingBottom : '15px'}}>
      <Row style={{marginBottom : '25px'}}>
        <Col xs={6}>
          <p>PAGE TITLE : {this.props.details.desktop.title}</p>
          <p>PAGE SPEED SCORE :  <Label bsStyle={(this.props.details.desktop.score <90)?('warning'):('success')}>{this.props.details.desktop.score} </Label></p>
          <p>HTML RESPONSE BYTES : <Label>{this.props.details.desktop.htmlResponseBytes} </Label> </p>
          <p>CSS RESPONSE BYTES : <Label>{this.props.details.desktop.cssResponseBytes}</Label> </p>
          <p>IMAGE RESPONSE BYTES : <Label>{this.props.details.desktop.imageResponseBytes}</Label> </p>
          <p>JS RESPONSE BYTES : <Label>{this.props.details.desktop.javascriptResponseBytes}</Label> </p>
        </Col>
        <Col xs={6}>
          <div className='screenshot-macbook'>
              <Image src ={imgPath} />
          </div>
        </Col>
      </Row>

        <Col xs={12}>
          <Table striped bordered condensed hover>
             <thead>
               <tr>
                 <th>Analyzed Item</th>
                 <th>Summary</th>
                 <th width="10%" style={{textAlign:'center'}}>Imapct <OverlayTrigger placement="top" overlay={tooltipImapct}>
      <Badge bsStyle="success"> ? </Badge>
    </OverlayTrigger> </th>

                 <th width="10%" style={{textAlign:'center'}} > Status <OverlayTrigger placement="top" overlay={tooltipStatus}>
      <Badge bsStyle="info"> ? </Badge>
    </OverlayTrigger> </th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td>{this.props.details.desktop.LandingPageRedirectsName}</td>
                 <td >{this.props.details.desktop.LandingPageRedirectsSummary}</td>
                 <td>{this.props.details.desktop.LandingPageRedirectsImpact}</td>
                 <td>{(this.props.details.desktop.LandingPageRedirectsImpact > 0)?(<Image src='/images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.details.desktop.EnableGzipCompressionName}</td>
                 <td>{this.props.details.desktop.EnableGzipCompressionSummary}</td>
                 <td>{(this.props.details.desktop.EnableGzipCompressionImpact)}</td>
                 <td style={{textAlign:'center'}}>{(this.props.details.desktop.EnableGzipCompressionImpact > 0)?(<Image src='/images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.details.desktop.LeverageBrowserCachingName}</td>
                 <td>{this.props.details.desktop.LeverageBrowserCachingSummary}</td>
                 <td>{this.props.details.desktop.LeverageBrowserCachingImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.details.desktop.LeverageBrowserCachingImpact > 0)?(<Image src='/images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.details.desktop.ServerResponseTimeName}</td>
                 <td>{this.props.details.desktop.ServerResponseTimeSummary}</td>
                 <td>{this.props.details.desktop.ServerResponseTimeImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.details.desktop.ServerResponseTimeImpact > 0)?(<Image src='/images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.details.desktop.MinifyCssName}</td>
                 <td>{this.props.details.desktop.MinifyCssSummary}</td>
                 <td>{this.props.details.desktop.MinifyCssImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.details.desktop.MinifyCssImpact > 0)?(<Image src='/images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.details.desktop.MinifyHTMLName}</td>
                 <td>{this.props.details.desktop.MinifyHTMLSummary}</td>
                 <td>{this.props.details.desktop.MinifyHTMLImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.details.desktop.MinifyHTMLImpact > 0)?(<Image src='/images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
               <tr>
                 <td>{this.props.details.desktop.MinifyJavaScriptName}</td>
                 <td>{this.props.details.desktop.MinifyJavaScriptSummary}</td>
                 <td>{this.props.details.desktop.MinifyJavaScriptImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.details.desktop.MinifyJavaScriptImpact > 0)?(<Image src='/images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>

               <tr>
                 <td>{this.props.details.desktop.MinimizeRenderBlockingName}</td>
                 <td>{this.props.details.desktop.MinimizeRenderBlockingSummary}</td>
                 <td>{this.props.details.desktop.MinimizeRenderBlockingImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.details.desktop.MinimizeRenderBlockingImpact > 0)?(<Image src='/images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>

               <tr>
                 <td>{this.props.details.desktop.OptimizeImagesName}</td>
                 <td>{this.props.details.desktop.OptimizeImagesSummary}</td>
                 <td>{this.props.details.desktop.OptimizeImagesImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.details.desktop.OptimizeImagesImpact > 0)?(<Image src='/images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>

               <tr>
                 <td>{this.props.details.desktop.PrioritizeVisibleContentName}</td>
                 <td>{this.props.details.desktop.PrioritizeVisibleContentSummary}</td>
                 <td>{this.props.details.desktop.PrioritizeVisibleContentImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.details.desktop.PrioritizeVisibleContentImpact >0)?(<Image src='/images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>

               <tr>
                 <td>{this.props.details.desktop.PrioritizeVisibleContentName}</td>
                 <td>{this.props.details.desktop.PrioritizeVisibleContentSummary}</td>
                 <td>{this.props.details.desktop.PrioritizeVisibleContentImpact}</td>
                 <td style={{textAlign:'center'}}>{(this.props.details.desktop.PrioritizeVisibleContentImpact > 0)?(<Image src='/images/cancel.png'/>):(<ProgressBar now={100} label={`${100}%`} bsStyle='success'  active />)}</td>
               </tr>
             </tbody>
           </Table>
    </Col>
      </Panel>
    </Row>
</Well>



)
}
}

function mapStateToProps(state){
return {

// loading : state.test.isLoading,
// allTestIsFetching : state.allTests.allTestIsFetching,
// test : state.test.test,
resultDetailsLoaded : state.resultDetails.resultDetailsLoaded,
details : state.resultDetails.resultDetails
}
}
function mapDispatchToProps(dispatch){
return bindActionCreators({testUrl,resultDetails}, dispatch)
}
export default connect(mapStateToProps,
mapDispatchToProps)(resultDetailsPage);
