
"use strict"
  import React from 'react';
  import {MenuItem, InputGroup, DropdownButton,Image,Thumbnail, Col, Row, Well, Panel,ProgressBar, Form ,FormControl,FormGroup, ControlLabel, Button,Label,Table,Glyphicon,Modal} from 'react-bootstrap';
  import {connect} from 'react-redux';
  import { Link } from 'react-router';
  import { browserHistory } from 'react-router'
  import {bindActionCreators} from 'redux';
  import {findDOMNode} from 'react-dom';
  import HomeSubContent from '../home-sub-content';
  var isUrl = require('is-url-superb');


class Home extends React.Component{


  constructor(props) {
          super(props);
          this.state = {
              url: '',
              validationState : 'null',
              urlValid : false,
              submitBTN : false,
               isLoading : false,
          }
      }


  handleSubmit(e){
   if (e.key === 13 || url ==null/* Enter */) {
  event.preventDefault();
}

      let requestedUrl = this.state.url;
      let urlNoProtocol = requestedUrl.replace(/^https?\:\/\//i, "");
      let prefix = 'http://';
      let trimmedUrl = prefix + urlNoProtocol;

      findDOMNode(this.refs.url).value='';
      browserHistory.push({pathname :"/currentTest",query:{url :trimmedUrl} });

    }


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
        let value = this.state.url;
        let urlCheck = isUrl(value);

          if (urlCheck){
            this.setState({submitBTN: true, urlValid: true});
             } else {
               this.setState({submitBTN: false, urlValid: false});
             }
    }

    // strategyHandle(e){
    //   this.setState({strategy : e.target.value});
    // }

    // HandleMore(){
    //   var skip = (this.state.skipValue)+4;
    //   this.setState({skipValue : skip});
    //   this.props.getAllTests(skip);
    //
    // }

render(){

  let isLoading = this.state.isLoading;
return(
<div>
  <header >
          <div className="header-content">
              <div className="inner">
                  <h1 >Security. Performance. Compatibility. SEO.</h1>
                  <h1></h1>
                  <h4>Seogram offers a simple, all-in-one test to check if your website meets current global standards and is free of criticals errors.</h4>
                    <Col xs={12} sm={8} smOffset={2}>
                      <Form inline onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}>

                         <FormGroup controlId="url"   validationState={(this.props.loading==false)?(null):this.getValidationState('url')} >

                           <FormControl type="text" placeholder="Enter URL" ref="url" name="url"
                             onChange={this.handleChange.bind(this)}  bsClass='form-control url-submit'/>
                             <FormControl.Feedback />
                          </FormGroup>
                        <Button
                          onClick={(!isLoading || this.props.loading==true)?(this.handleSubmit.bind(this)):(null) }
                           bsClass='home-btn'
                          disabled={!this.state.submitBTN} >
                          {(!isLoading || this.props.loading==true)?('Test it'):('Analyzing...')}
                         </Button>
                      </Form>
                           </Col>
              </div>
          </div>
      </header>

<HomeSubContent />

</div>
)
}
}

export default Home;
