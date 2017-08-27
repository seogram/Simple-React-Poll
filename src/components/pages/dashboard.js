"use strict"
  import React from 'react';
  import {Tabs,Tab,Pagination,Row,Col,Button,Alert} from 'react-bootstrap';
  import {connect} from 'react-redux';
  import { Link } from 'react-router';
  import { browserHistory } from 'react-router'
  import {bindActionCreators} from 'redux';
  import {findDOMNode} from 'react-dom';
  import {getAllTests} from '../../actions/report';
  import {userProfile} from '../../actions/userProfile';
  import {profileUpdate} from '../../actions/userProfile';
  import {passwordUpdate} from '../../actions/userProfile';
  import axios from 'axios';
//  import Loading from '../loading';
  import validator from 'validator';



class Dashboard extends React.Component{


  constructor(props) {
          super(props);
          this.state = {

              validationState : 'null',
              formErrors :  {firstName : '',lastName : '',password : ''},
              alertVisible: false,
              alertErrVisible : false,
              ProfileSubmitBTN : false,
              passwordSubmitBTN : false,
              isLoading : false,
              skipValue : 0,
              testItems : [],
              loadMoreBTN : true,
              activePage: 1,
              userProfile : {
                 firstName : '',
                 lastName : '',

               }
          }
      }

      componentWillMount(){
        if (this.props.authenticated){
          this.props.getAllTests(this.state.skipValue);
          this.props.userProfile();
        }

      }

      componentWillReceiveProps(newProps){
        if(newProps.allTests.length > 0 ){

          if(newProps.allTests!== this.state.testItems  ){
            this.setState({
              testItems : newProps.allTests,
            });
            var  allTestArray = this.state.testItems;
            var newTestItems = this.props.allTests.map((newItems)=>{
               allTestArray.push(newItems);
               this.setState({testItems : allTestArray});
             });
          }

          }else {
            this.setState({loadMoreBTN : false})
        }


        if(newProps.allTestsErr !==undefined){
          this.setState({alertErrVisible : true});
        }

        if(newProps.profileSuccess !==undefined){
          this.setState({alertVisible : true});
          setTimeout(()=>{this.setState({alertVisible : false})
        }, 2000);
        }

        if(newProps.profileErr !==undefined ){
          this.setState({
            alertErrVisible : true
          });
          setTimeout(()=>{this.setState({alertErrVisible : false})
        }, 7000);
        }

}
    handleChange(e) {
      this.state.ProfileSubmitBTN = true;
      this.setState({
          [e.target.name] : e.target.value
      });
     }

    handlePasswordChange () {
      this.setState({passwordSubmitBTN : true});
    }

    handleSelect(eventKey) {
      this.setState({
        activePage: eventKey
      });
    }


    HandleMore(){
      var skip = (this.state.skipValue)+4;
      this.setState({skipValue : skip});
      this.props.getAllTests(skip);

    }

    rowLink(report_id){
      browserHistory.push({pathname:'/history',query:{id : report_id}});
    }

    handleUpdate(e){
      e.preventDefault();
      this.setState({formErrors:{password:''}});

      let firstName = this.state.firstName,
          lastName = this.state.lastName,
        //  email = this.state.email,
          formHasError = '';
            if(firstName !==undefined){
                if(!validator.isAlpha(firstName,['en-US'])){
                 this.setState({formErrors:{firstName : 'First Name must only contain letters and numbers'}})
                formHasError = true;
                this.state.ProfileSubmitBTN = false;
                }else {
                formHasError = false;
                this.state.ProfileSubmitBTN = true;
                }
            }

            if(lastName !==undefined){
                if(!validator.isAlpha(lastName,['en-US'])){
                  this.setState({formErrors:{lastName : 'Last Name must only contain letters and numbers'}})
                  formHasError = true;
                  this.state.ProfileSubmitBTN = false;
                }else {
                  formHasError : false;
                  this.state.ProfileSubmitBTN = true;
                }
            }



          if (findDOMNode(this.refs.firstName).value == ''){
          firstName = this.props.profile.firstName;
          }
          if (findDOMNode(this.refs.lastName).value == '') {
          lastName= this.props.profile.lastName;
          }

          if(!formHasError){
            this.setState({formErrors:{firstName : '',lastName:'',password : ''}})

            let profile = {firstName:firstName,lastName: lastName}

           this.props.profileUpdate(profile);
          }

    }

    handlePasswordUpdate (e){
       this.setState({formErrors:{firstName:'',lastName:''}});
        let formHasError = false;
        if (findDOMNode(this.refs.password).value !==''){
          e.preventDefault();
          let password = findDOMNode(this.refs.password).value;
          let newPassword = {password : findDOMNode(this.refs.password).value}
          findDOMNode(this.refs.password).value =='';
          if (password.length < 5 || password.length > 10 || !validator.isAlphanumeric(password,['en-US'])) {
            this.setState({formErrors:{password : 'Password is not Valid'}});
            formHasError = true;
          }
          if(!formHasError){
            this.setState({formErrors:{password : ''}})
            this.props.passwordUpdate(newPassword);
          }
      }else{
        e.preventDefault();
        formHasError : true;
      }
    }

    handleAlertDismiss() {
      this.setState({alertVisible: false});
    }

    handleErrAlertDismiss() {
      this.setState({alertErrVisible: false});
    }


render(){
const {profileSuccess,profileErr,allTestsErr} = this.props;
  const allTestsList = this.state.testItems.map((testItems)=>{
//const allTestsList = this.props.allTests.map((testItems)=>{

  let d = new Date(testItems.date);
  let report_id = testItems.report_id;
  var newDate =  [d.getDate(), d.getMonth()+1, d.getFullYear()].join('/');

    return(

            <tr className="clickableRow" onClick={this.rowLink.bind(this,report_id)}>
               <td className="col-md-1"><img src="images/favicon.png" /> {testItems.page_Score}</td>
               <td className="col-md-8">Single page test of :<strong> {testItems.url}</strong></td>
               <td className="col-md-1">{testItems.total_Issues}</td>
               <td className="col-md-2">{newDate}</td>
            </tr>

    );
  });

return(
  <div>
<div className="container">
  <div className="dashboard-nav">
    <div className="container-inner">
{/*bootstrap-react tab  */}
      <Tabs defaultActiveKey={1} id="uncontrolled-tab">
        <Tab eventKey={1} title="SAVED REPORTS">
          {this.state.alertErrVisible && <Alert bsStyle="danger" onDismiss={this.handleErrAlertDismiss.bind(this)}>
              <h5 style={{textAlign : "center"}}>{profileErr}</h5><br/>  <h5 style={{textAlign:"center"}}>{allTestsErr}</h5>
             </Alert>}
        <h3>HISTORY</h3>
          <div className="table-responsive">
            <table className="table table-hover">
             <tbody>
               {(!allTestsErr)?(allTestsList):''}

             </tbody>
            </table>
          </div>
          <Row>
            <Col >
             <div style={{textAlign:'center'}}>
               {(!allTestsErr)?(<Button
                     bsStyle='success' bsSize='small' onClick={this.HandleMore.bind(this)} disabled={!this.state.loadMoreBTN}>Load more..</Button>):''}

             </div>
            </Col>
          </Row>
      </Tab>

        <Tab eventKey={2} title="MY ACCOUNT">
          {/*Alert Message */}

          {this.state.alertVisible && <Alert bsStyle="success" onDismiss={this.handleAlertDismiss.bind(this)}>
               {profileSuccess}
             </Alert>}

          {this.state.alertErrVisible && <Alert bsStyle="danger" onDismiss={this.handleErrAlertDismiss.bind(this)}>
               {profileErr}
             </Alert>}
     <div className="container-inner-narrow">

     <h3>Profile</h3>

    <p className="errorMsg">{this.state.formErrors.firstName}</p>
    <p className="errorMsg">{this.state.formErrors.lastName}</p>

     <form >
       <div className="form-group">
       <input type="text" className="form-control"   name="firstName"  placeholder={this.props.profile.firstName || 'First Name'} onChange={this.handleChange.bind(this)} ref="firstName"/>

       </div>
       <div className="form-group">
       <input type="text" className="form-control"  name="lastName"  placeholder={this.props.profile.lastName || 'Last Name'} onChange={this.handleChange.bind(this)} ref="lastName"/>

       </div>
       <div className="form-group">
       <span style={{fontSize : '18px'}}>Email : </span><span className="label label-success" style={{fontSize : '16px'}}>{this.props.profile.email ||''} </span><span style={{float : "right"}}>Can not be changed</span>
       </div>
       <div className="space-sm"></div>
       <button onClick={this.handleUpdate.bind(this)} type="submit" className="btn btn-default-dark-small" disabled={!this.state.ProfileSubmitBTN}>UPDATE</button>
       <div className="space-sm"></div>
     </form>

      <form >
       <div className="form-group">
       <input type="password" className="form-control"  placeholder="New Password" ref="password" onChange={this.handlePasswordChange.bind(this)} />
      <small id="firstName-Help" className="form-text text-muted">Password must be between 5-10 characters including only letters and numbers</small>

       </div>
       <button type="submit" className="btn btn-default-dark-small" onClick={this.handlePasswordUpdate.bind(this)} disabled={!this.state.passwordSubmitBTN}>CHANGE</button>
       <p className="errorMsg">{this.state.formErrors.password}</p>
       <div className="space-sm"></div>
     </form>
   </div>
   </Tab>
 </Tabs>
      </div>
    </div>
  </div>

</div>

)

}
}

function mapStateToProps(state){
return {

loading : state.test.isLoading,
allTestIsFetching : state.allTests.allTestIsFetching,
profile : state.profile.profile,
allTests : state.allTests.allTests,
allTestsErr : state.allTests.errMsg,
profileErr : state.profile.errMsg,
profileSuccess : state.profile.successMsg,
authenticated: state.auth.authenticated

}
}
function mapDispatchToProps(dispatch){
return bindActionCreators({
getAllTests,userProfile,profileUpdate,passwordUpdate}, dispatch)
}

export default connect(mapStateToProps,
mapDispatchToProps) (Dashboard);
