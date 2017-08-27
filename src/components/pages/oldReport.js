
"use strict"
import React from 'react';
import {
  MenuItem,
  InputGroup,
  DropdownButton,
  Image,
  Thumbnail,
  Col,
  Row,
  Well,
  Panel,
  ProgressBar,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  Label,
  Table,
  Glyphicon,
  Modal,
  Tabs,
  Tab,
  Accordion,
  Badge
} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {testUrl} from '../../actions/report';
import {getOldReport} from '../../actions/report';
import axios from 'axios';
//import Loading from '../loading';
import LoadingModal from '../loadingModal';
var isUrl = require('is-url-superb');

class oldReport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      strategy: 'desktop',
      validationState: 'null',
      urlValid: false,
      checkboxValid: false,
      formValid: false,
      submitBTN: false,
      isLoading: false,
      loadingModal: false,
      filmstripModal : false,
      filmStripImg : '',
      testItems: [],
      defaultkey : '1'
    }
  }
  componentDidMount() {
    var testId = this.props.location.query.id;

      this.setState({url: '',isLoading : true,loadingModal : true,submitBTN : false});
      this.props.getOldReport(testId);
  }


  componentWillReceiveProps(newProps) {
    if (newProps.oldReport && this.state.isLoading) {
      this.setState({isLoading: false})
    }
  }

  handleSubmit(e){

      if (e.key === 13 || url ==null/* Enter */) {
       event.preventDefault();
      }
      let requestedUrl = this.state.url;
      let urlNoProtocol = requestedUrl.replace(/^https?\:\/\//i, "");
      let prefix = 'http://';
      let newUrl = prefix + urlNoProtocol;
      findDOMNode(this.refs.url).value='';
      this.setState({url: '',isLoading : true,loadingModal : true,submitBTN : false});
      console.log(newUrl);
      this.props.testUrl(newUrl);
  }


  getValidationState(urlField) {
    switch (urlField) {
      case 'url':
        var url = this.state.url;
        if (url == '') {
          return null
        } else if (!this.state.urlValid && url.length > 0) {
          return 'warning';
        } else {
          return 'success';
        }
        break;
      case 'strategy':
        var strategy = this.state.strategy;
        if (strategy == '') {
          return 'warning';
        } else if (strategy.length > 0) {
          return 'success'
        }
      default:
        break;
    }
  }

  handleChange(e) {
    this.setState({
      url: e.target.value
    }, function() {
      this.handleSubmitBTN();
    });
  }

  handleSubmitBTN() {
    var value = this.state.url;
    var urlCheck = isUrl(value);

      if (urlCheck){
        this.setState({submitBTN: true, urlValid: true});
         } else {
           this.setState({submitBTN: false, urlValid: false});
         }
     }



  modalClose() {
    this.setState({ filmstripModal: false });
  }

  handleTab(id) {
    this.setState({defaultkey : id});

  }
  handleTabSelect(defaultkey){

    this.setState({defaultkey});
  }


  render() {

    let isLoading = this.state.isLoading,
        page_Score = this.props.oldReport.page_Score,
        test_Number = this.props.oldReport.test_Number,
        page_Size = this.props.oldReport.page_Size,
        page_Speed = this.props.oldReport.page_Speed,
        city = this.props.oldReport.city,
        server_IP = this.props.oldReport.server_IP,
        total_Issues = this.props.oldReport.total_Issues,
        report_Date = this.props.oldReport.report_Date,
        critical_Number = this.props.oldReport.critical_Number,
        error_Number = this.props.oldReport.error_Number,
        notice_Number = this.props.oldReport.notice_Number,
        warning_Number = this.props.oldReport.warnings_Number,
        Report_url = this.props.oldReport.url,
        mobile_screenShot = this.props.oldReport.mobile_screenShot,
        desktop_screenShot = this.props.oldReport.desktop_screenShot,
        requests_Number = this.props.oldReport.requests_Number,
        issues = this.props.oldReport.issues,
        issue_Content = this.props.oldReport.issues.content,
        issue_Security = this.props.oldReport.issues.security,
        issue_Performance = this.props.oldReport.issues.performance,
        issue_Compatibility = this.props.oldReport.issues.compatibility,
        stats_By_Category = this.props.oldReport.stats_By_Category,
        contentIssuesByType = {},
        contentIssuesByTest = {},
        content_issue_list = [],
        content_issues_warning_count = 0,
        content_issues_notice_count = 0,
        content_issues_error_count = 0,
        content_issues_critical_count = 0,
        content_Score = 0,
        securityIssuesByType = {},
        securityIssuesByTest = {},
        security_issue_list = [],
        security_issues_warning_count = 0,
        security_issues_notice_count = 0,
        security_issues_error_count = 0,
        security_issues_critical_count = 0,
        security_Score = 0,
        compatibilityIssuesByType = {},
        compatibilityIssuesByTest = {},
        compatibility_issue_list = [],
        compatibility_issues_warning_count = 0,
        compatibility_issues_notice_count = 0,
        compatibility_issues_error_count = 0,
        compatibility_issues_critical_count = 0,
        compatibility_Score = 0,
        performanceIssuesByType = {},
        performanceIssuesByTest ={},
        performance_issue_list = [],
        performance_issues_warning_count = 0,
        performance_issues_notice_count = 0,
        performance_issues_error_count = 0,
        performance_issues_critical_count = 0,
        performance_Score = 0;
        let firstRender = 0;

        var partialHtml = [];




    const filmstrips = this.props.oldReport.filmstrip.map((filmItem, i) => {
      let imgSrc = filmItem.url;
      if(filmItem.order == '2'){
        firstRender = filmItem.delay/1000;
      }


      return (
        <div className="col-xs-2" key={i}><img src={imgSrc} className="filmstrips"  onClick={()=>{
            this.setState({ filmstripModal: true,filmStripImg : imgSrc });

          }} /></div>
      );
    });

    if (issue_Content != null) {

        issue_Content.forEach((error) => {
        contentIssuesByType[error.type] = contentIssuesByType[error.type] || [];
        contentIssuesByTest[error.test] = contentIssuesByTest[error.test] || [];
        contentIssuesByType[error.type].push(error);
        contentIssuesByTest[error.test].push(error);
      });
        //Caculating error/warning / notice / critical count
        if(contentIssuesByType.warning){
           contentIssuesByType.warning.map((item1)=>{ content_issues_warning_count +=item1.count});
          }
          if(contentIssuesByType.error){
          contentIssuesByType.error.map((item2)=>{ content_issues_error_count +=item2.count});
        }
          if(contentIssuesByType.critical){
          contentIssuesByType.critical.map((item3)=>{ content_issues_critical_count +=item3.count});
          }
          if (contentIssuesByType.notice) {
            contentIssuesByType.notice.map((item4)=>{content_issues_notice_count +=item4.count});
       }
    }

    if (issue_Security != null) {
      issue_Security.forEach((error) => {
        securityIssuesByType[error.type] = securityIssuesByType[error.type] || [];
        securityIssuesByTest[error.test] = securityIssuesByTest[error.test] || [];
        securityIssuesByType[error.type].push(error);
        securityIssuesByTest[error.test].push(error);
      });
        //Caculating error/warning / notice / critical count
        if(securityIssuesByType.warning){
           securityIssuesByType.warning.map((item)=>{ security_issues_warning_count +=item.count});
          }
        if(securityIssuesByType.error){
          securityIssuesByType.error.map((item)=>{ security_issues_error_count +=item.count});
          }
        if(securityIssuesByType.critical){
          securityIssuesByType.critical.map((item)=>{ security_issues_critical_count +=item.count});
          }
        if (securityIssuesByType.notice) {
            securityIssuesByType.notice.map((item)=>{security_issues_notice_count +=item.count});
       }
    }

    if (issue_Performance != null) {

      issue_Performance.forEach((error) => {
        performanceIssuesByType[error.type] = performanceIssuesByType[error.type] || [];
        performanceIssuesByTest[error.test] = performanceIssuesByTest[error.test] || [];
        performanceIssuesByType[error.type].push(error);
        performanceIssuesByTest[error.test].push(error);
      });
        //Caculating error/warning / notice / critical count
        if(performanceIssuesByType.warning){
           performanceIssuesByType.warning.map((item1)=>{ performance_issues_warning_count +=item1.count});
          }
          if(performanceIssuesByType.error){
          performanceIssuesByType.error.map((item2)=>{ performance_issues_error_count +=item2.count});
          }
          if(performanceIssuesByType.critical){
          performanceIssuesByType.critical.map((item3)=>{ performance_issues_critical_count +=item3.count});
          }
          if (performanceIssuesByType.notice) {
            performanceIssuesByType.notice.map((item4)=>{performance_issues_notice_count +=item4.count});
       }
    }


    if (issue_Compatibility != null) {
        issue_Compatibility.forEach((error) => {
        compatibilityIssuesByType[error.type] = compatibilityIssuesByType[error.type] || [];
        compatibilityIssuesByTest[error.test] = compatibilityIssuesByTest[error.test] || [];
        compatibilityIssuesByType[error.type].push(error);
        compatibilityIssuesByTest[error.test].push(error);
        });
        //Caculating error/warning / notice / critical count
        if(compatibilityIssuesByType.warning){
           compatibilityIssuesByType.warning.map((item)=>{ compatibility_issues_warning_count +=item.count});
          }
          if(compatibilityIssuesByType.error){
          compatibilityIssuesByType.error.map((item)=>{ compatibility_issues_error_count +=item.count});
          }
          if(compatibilityIssuesByType.critical){
          compatibilityIssuesByType.critical.map((item)=>{ compatibility_issues_critical_count +=item.count});
          }
          if (compatibilityIssuesByType.notice) {
            compatibilityIssuesByType.notice.map((item)=>{ compatibility_issues_notice_count +=item.count});
       }
      }


      //Creating Content Issues List

        for (var key in contentIssuesByTest) {
          if (!contentIssuesByTest.hasOwnProperty(key))
            continue;
            var arr = contentIssuesByTest[key];
            var title = contentIssuesByTest[key][0].test;
            partialHtml = arr.map((items, i)=>{
                 return(
                   <tr key={'ph' + i}>
                     <td className="col-md-1">
                       <div className="box">
                         <span>{items.count}</span>
                       </div>
                     </td>
                     <td className="col-md-1">{items.impact.toFixed(2)}</td>
                     <td className="col-md-10">{items.message}</td>
                   </tr>
                 );
     });

          var fullHtml = (
          <div key={'fh' + content_issue_list.length}>
            <div className="report-group-header">
              <h4>{title}</h4>
            </div>
            <div className="table-responsive">
              <table className="table ">
                  <thead>
                    <tr >
                      <td >Count</td>
                      <td >Imapct</td>
                      <td >Rule</td>
                    </tr>
                  </thead>
                  <tbody>
                    {partialHtml}
                  </tbody>
              </table>
            </div>
          </div>
        )
          content_issue_list.push(fullHtml);
        }


      //Creating Security Issues List

        for (var key in securityIssuesByTest) {
          if (!securityIssuesByTest.hasOwnProperty(key))
            continue;
            var arr = securityIssuesByTest[key];
            var title = securityIssuesByTest[key][0].test;
            partialHtml = arr.map((items, i)=>{
                 return(
                   <tr key={'ph' + i}>
                     <td className="col-md-1">
                       <div className="box">
                         <span>{items.count}</span>
                       </div>
                     </td>
                     <td className="col-md-1">{items.impact.toFixed(2)}</td>
                     <td className="col-md-10">{items.message}</td>
                   </tr>
                 );
     });

          var fullHtml = (
          <div key={'fh' + security_issue_list.length}>
            <div className="report-group-header">
              <h4>{title}</h4>
            </div>
            <div className="table-responsive">
              <table className="table ">
                  <thead>
                    <tr >
                      <td >Count</td>
                      <td >Imapct</td>
                      <td >Rule</td>
                    </tr>
                  </thead>
                  <tbody>
                    {partialHtml}
                  </tbody>
              </table>
            </div>
          </div>
        )
          security_issue_list.push(fullHtml);
        }


      //Creating Perforance Issues List

        for (var key in performanceIssuesByTest) {
          if (!performanceIssuesByTest.hasOwnProperty(key))
            continue;
            var arr = performanceIssuesByTest[key];
            var title = performanceIssuesByTest[key][0].test;
            partialHtml = arr.map((items, i)=>{
                 return(
                   <tr key={'ph' + i}>
                     <td className="col-md-1">
                       <div className="box">
                         <span>{items.count}</span>
                       </div>
                     </td>
                     <td className="col-md-1">{items.impact.toFixed(2)}</td>
                     <td className="col-md-10">{items.message}</td>
                   </tr>
                 );
     });


          var fullHtml = (
          <div key={'fh' + performance_issue_list.length}>
            <div className="report-group-header">
              <h4>{title}</h4>
            </div>
            <div className="table-responsive">
              <table className="table ">
                  <thead>
                    <tr >
                      <td >Count</td>
                      <td >Imapct</td>
                      <td >Rule</td>
                    </tr>
                  </thead>
                  <tbody>
                    {partialHtml}
                  </tbody>
              </table>
            </div>
          </div>
        )
          performance_issue_list.push(fullHtml);
        }

    //Creating Compatibility Issues List

      for (var key in compatibilityIssuesByTest) {
        if (!compatibilityIssuesByTest.hasOwnProperty(key))
          continue;
          var arr = compatibilityIssuesByTest[key];
          var title = compatibilityIssuesByTest[key][0].test;
          partialHtml = arr.map((items, i)=>{
               return(
                 <tr key={'ph' + i}>
                   <td className="col-md-1">
                     <div className="box">
                       <span>{items.count}</span>
                     </div>
                   </td>
                   <td className="col-md-1">{items.impact.toFixed(2)}</td>
                   <td className="col-md-10">{items.message}</td>
                 </tr>
               );
   });


        var fullHtml = (
        <div key={'fh' + compatibility_issue_list.length}>
          <div className="report-group-header">
            <h4>{title}</h4>
          </div>
          <div className="table-responsive">
            <table className="table ">
                <thead>
                  <tr >
                    <td >Count</td>
                    <td >Imapct</td>
                    <td >Rule</td>
                  </tr>
                </thead>
                <tbody>
                  {partialHtml}
                </tbody>
            </table>
          </div>
        </div>
      )
        compatibility_issue_list.push(fullHtml);
      }

      //Creating compatibility overall SCORE

      if(stats_By_Category.compatibility != undefined){
       stats_By_Category.compatibility.map((item)=>{
         compatibility_Score += item.score
       });
       compatibility_Score = (compatibility_Score/(stats_By_Category.compatibility.length)).toFixed(2);
      }


      //Creating security overall SCORE

      if(stats_By_Category.security != undefined){
      stats_By_Category.security.map((item)=>{
        security_Score += item.score
      });
      security_Score = (security_Score/(stats_By_Category.security.length)).toFixed(2);
      }

      //Creating content overall SCORE

      if(stats_By_Category.content != undefined){
      stats_By_Category.content.map((item)=>{
        content_Score += item.score
      });
      content_Score = (content_Score/(stats_By_Category.content.length)).toFixed(2);
      }

      //Creating performance overall SCORE

      if(stats_By_Category.performance != undefined){
      stats_By_Category.performance.map((item)=>{
        performance_Score += item.score
      });
      performance_Score = (performance_Score/(stats_By_Category.performance.length)).toFixed(2);
      }

    return (
      <div>
<div className="report-back-btn "><Link className="report-back-btn-link" to="/dashboard">Back </Link></div>
        <div className="alert alert-warning report-alert">
          <p>This test represents only 1 page on the site, scan the website for a full report.</p>
        </div>

        <div id="url-submit-bg">
          <div className="inner">
            <Col xs={12} sm={8} smOffset={2}>
              <Form inline onKeyPress={e => {
                if (e.key === 'Enter')
                  e.preventDefault();
                }}>

                <FormGroup controlId="url" validationState={(this.props.loading == false)
                  ? (null)
                  : this.getValidationState('url')}>

                  <FormControl type="text" placeholder="Enter URL" ref="url" name="url" onChange={this.handleChange.bind(this)} bsClass='form-control url-submit'/>
                  <FormControl.Feedback/>
                </FormGroup>

                <Button onClick={(!isLoading || this.props.loading == true)
                  ? (this.handleSubmit.bind(this))
                  : (null)} bsClass='home-btn' disabled={!this.state.submitBTN}>
                  {(!isLoading || this.props.loading == true)
                    ? ('Test it')
                    : ('Analyzing...')}
                </Button>

              </Form>

            </Col>
          </div>
        </div>

        <div className="container-inner">
          <div className="row">
            <div className="space-sm"></div>
            <h2 className="report_title">{Report_url}</h2>
            <hr/>
            <div className="space-md"></div>
            <div className="table-responsive" id="report-summary-table">
              <table className="table">

                <thead>
                  <tr className="center">
                    <td >PAGE SCORE</td>
                    <td >PAGES</td>
                    <td >ISSUES</td>
                    <td >SPEED</td>
                    <td >SIZE</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="center">
                    <td >
                      <img src="/images/favicon.png" className="report-logo"/>
                      <span className="current-score">{page_Score}</span>/100
                    </td>
                    <td >
                      <p className="report-sub-scores">1 Page</p>
                      <p className="report-sub-content">{test_Number}
                        tests</p>
                    </td>
                    <td >
                      <p className="report-sub-scores">{total_Issues}</p>
                      <p className="report-sub-content">{critical_Number}
                        criticals</p>
                      <p className="report-sub-content">{error_Number}
                        errors</p>
                      <p className="report-sub-content">{warning_Number}
                        warnings</p>
                      <p className="report-sub-content">{notice_Number}
                        notices</p>
                    </td>
                    <td >
                      <img src="/images/turtle256.png" className="report-small-icon"/>
                      <span className="report-sub-scores">{page_Speed / 1000}
                        s</span>
                    </td>
                    <td >
                      <img src="/images/feather256.png" className="report-small-icon"/>
                      <span className="report-sub-scores">{(page_Size / 1000000).toFixed(2)}
                        mb</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="report-summary-mobile">
              <div className="row">
                <div className="col-xs-12">
                  <img src="/images/favicon.png" className="report-logo"/>
                  <span className="current-score">{page_Score}</span>/100
                </div>
                <div className="space-md"></div>
                <div className="col-xs-3">
                  <p>Pages</p>
                  <p>1</p>
                </div>
                <div className="col-xs-3">
                  <p>Issues</p>
                  <p>{total_Issues}</p>
                </div>
                <div className="col-xs-3">
                  <p>Speed</p>
                  <p>{(page_Speed / 1000).toFixed(2)}</p>
                </div>
                <div className="col-xs-3">
                  <p>Size</p>
                  <p>{(page_Size / 1000000).toFixed(2)}kb</p>
                </div>
              </div>
              <hr/>
            </div>
          </div>
        </div>

        <div className="space-sm"></div>
        <div className="well" id="filmstrip-container">
          <div className="container-inner ">
            <div className="row">
              <div className="col-xs-12 col-sm-6 text-left">
                <p>BROWSER RENDER JOURNEY</p>
              </div>
              <div className="col-xs-12 col-sm-6 text-right">
                <p>FIRST RENDER AT {firstRender}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="container-inner report-screenshot-scroll">
                  <div className="row text-center">
                    { filmstrips }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="well" id="report-tab-container"></div>

        <div className="container-inner">
          <div className="row" id="report-tab-row">
            <div id="report-tab-wrapper">

              <Tabs activeKey={Number(this.state.defaultkey)} onSelect={this.handleTabSelect.bind(this)} id="controlled-tab-example">
                <Tab eventKey={1} title="OVERVIEW">
                  <div className="vdivide">
                    <div className="col-xs-12 col-sm-6 col-md-3 text-center">
                      <h1>{performance_Score}%</h1>
                      <p>Performance</p>
                      <img src="/images/performance.png" className="report-col-img"/>

                      <p className="report-sub-content">{(performanceIssuesByType.critical != null)
                          ? (performance_issues_critical_count)
                          : ('0')}
                        <span className="hori-space"></span> critical</p>

                      <p className="report-sub-content">{(performanceIssuesByType.error != null)
                          ? (performance_issues_error_count)
                          : ('0')}
                        <span className="hori-space"></span>   errors</p>

                      <p className="report-sub-content">{(performanceIssuesByType.warning != null)
                          ? (performance_issues_warning_count)
                          : ('0')}
                        <span className="hori-space"></span>  warnings</p>

                      <p className="report-sub-content">{(performanceIssuesByType.notice != null)
                          ? (performance_issues_notice_count)
                          : ('0')}
                        <span className="hori-space"></span>  notices</p>

                          <div className="space-sm"></div>
                            <Button bsSize="large" bsStyle="primary" onClick={this.handleTab.bind(this,3)}>
                            VIEW FULL REPORT
                            </Button>
                      <hr className="mobile-hr"/>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3 text-center">
                      <h1>{compatibility_Score}%</h1>
                      <p>Compatibility</p>
                      <img src="/images/compatibility.png" className="report-col-img"/>

                      <p className="report-sub-content">{(compatibilityIssuesByType.critical != null)
                          ? (compatibility_issues_critical_count)
                          : ('0')}
                        <span className="hori-space"></span>  critical</p>

                      <p className="report-sub-content">{(compatibilityIssuesByType.error != null)
                          ? (compatibility_issues_error_count)
                          : ('0')}
                        <span className="hori-space"></span>  errors</p>

                      <p className="report-sub-content">{(compatibilityIssuesByType.warning != null)
                          ? (compatibility_issues_warning_count)
                          : ('0')}
                        <span className="hori-space"></span>  warnings</p>

                      <p className="report-sub-content">{(compatibilityIssuesByType.notice != null)
                          ? (compatibility_issues_notice_count)
                          : ('0')}
                        <span className="hori-space"></span>  notices</p>
                          <div className="space-sm"></div>
                          <Button bsSize="large" bsStyle="primary" onClick={this.handleTab.bind(this,4)}>
                          VIEW FULL REPORT
                          </Button>
                      <hr className="mobile-hr"/>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3 text-center">
                      <h1>{content_Score}%</h1>
                      <p>Content</p>
                      <img src="/images/content.png" className="report-col-img"/>

                      <p className="report-sub-content">{(contentIssuesByType.critical != null)
                          ? (content_issues_critical_count)
                          : ('0')}
                        <span className="hori-space"></span>  critical</p>

                      <p className="report-sub-content">{(contentIssuesByType.error != null)
                          ? (content_issues_error_count)
                          : ('0')}
                        <span className="hori-space"></span>  errors</p>

                      <p className="report-sub-content">{(contentIssuesByType.warning != null)
                          ? (content_issues_warning_count)
                          : ('0')}
                        <span className="hori-space"></span>  warnings</p>

                      <p className="report-sub-content">{(contentIssuesByType.notice != null)
                          ? (content_issues_notice_count)
                          : ('0')}
                        <span className="hori-space"></span>  notices</p>
                        <div className="space-sm"></div>
                          <Button bsSize="large" bsStyle="primary" onClick={this.handleTab.bind(this,5)}>
                          VIEW FULL REPORT
                          </Button>
                      <hr className="mobile-hr"/>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3 text-center">
                      <h1>{security_Score}%</h1>
                      <p>Security</p>
                      <img src="/images/security.png" className="report-col-img"/>

                      <p className="report-sub-content">{(securityIssuesByType.critical != null)
                          ? (security_issues_critical_count)
                          : ('0')}
                        <span className="hori-space"></span>  critical</p>

                      <p className="report-sub-content">{(securityIssuesByType.error != null)
                          ? (security_issues_error_count)
                          : ('0')}
                        <span className="hori-space"></span>  errors</p>

                      <p className="report-sub-content">{(securityIssuesByType.warning != null)
                          ? (security_issues_warning_count)
                          : ('0')}
                        <span className="hori-space"></span>  warnings</p>

                      <p className="report-sub-content">{(securityIssuesByType.notice != null)
                          ? (security_issues_notice_count)
                          : ('0')}
                        <span className="hori-space"></span>  notices</p>
                        <div className="space-sm"></div>
                          <Button bsSize="large" bsStyle="primary" onClick={this.handleTab.bind(this,6)}>
                          VIEW FULL REPORT
                          </Button>
                    </div>
                  </div>

                </Tab>

                <Tab eventKey={2} title="ISSUES">
                  <div className="grouped">

                  {performance_issue_list}
                  {compatibility_issue_list}
                  {content_issue_list}
                  {security_issue_list}

                  </div>
                </Tab>
                <Tab eventKey={3} title="PERFORMANCE" >
                  <div className="grouped">

                    {performance_issue_list}
                  </div>

                </Tab>
                <Tab eventKey={4} title="COMPATIBILITY" >
                  <div className="grouped">

                    {compatibility_issue_list}
                  </div>

                </Tab>
                <Tab eventKey={5} title="CONTENT" >
                  <div className="grouped">

                    {content_issue_list}
                  </div>
                </Tab>
                <Tab eventKey={6} title="SECURITY" >
                  <div className="grouped">

                    {security_issue_list}

                  </div>
                </Tab>
              </Tabs>

            </div>
          </div>

          <div className="space-lg"></div>
        </div>

      <LoadingModal show={this.state.isLoading} />
      <LoadingModal show={this.state.isLoading} />


        <Modal  show={this.state.filmstripModal}  onHide={this.modalClose.bind(this)}>
         <Modal.Header>
           <Modal.Title>FILMSTRIPE</Modal.Title>
         </Modal.Header>

         <Modal.Body className="modal_center">
           <img src={this.state.filmStripImg} width="500" />

         </Modal.Body>

       </Modal>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {loading: state.test.isLoading, test: state.test.test,oldReport : state.oldReport.oldReport}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getOldReport,testUrl
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(oldReport);
