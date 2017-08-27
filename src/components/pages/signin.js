"use strict"
  import React from 'react';

  import {connect} from 'react-redux';
  import { Link } from 'react-router';
  import { browserHistory } from 'react-router'
  import {bindActionCreators} from 'redux';
  import {findDOMNode} from 'react-dom';
  import {signin} from '../../actions/auth';
  import LoginLeftContent from '../login-left-content';


class Signin extends React.Component{


  constructor(props) {
          super(props);
          this.state = {
              email : '',
              password : '',
              errors: '',
              isLoading: false,
              invalid: false
          }
          this.handleChange = this.handleChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
      }


      onSubmit(e) {
        e.preventDefault();
        let email = this.state.email,
          password = this.state.password,
          credentials = {email : email , password : password};
          this.setState({isLoading: true });
          this.props.signin(credentials)
      }


    handleChange(e) {
      this.setState({
      [e.target.name] : e.target.value
       });
     }



render(){

return(
  <div>
    <div className="container-fluid">

                  <div className="row">

                      <LoginLeftContent />

                      <div className="col-xs-12 col-md-6 ">
                          <div className="row" >
                           <div className="signUp-inner-col-right">

                              <p className="signUp-col-right-title">Need an account? <Link to ="/signup" className="text-dark"> Sign up here</Link></p>
                              <button type="button" className="btn btn-default-dark btn-lg btn-block "><span>
                              <img className="signUp-ico" src="images/github.png" />
                              </span>Login with Github</button>
                              <div className="clearfix"></div>
                              <div className="space-xs"></div>

                              <button type="button" className="btn btn-default-dark btn-lg btn-block "><span>
                              <img className="signUp-ico" src="images/google.png" />
                              </span>Login with Google</button>
                              <div className="space-sm"></div>
                              <hr className="signUp-col-left-hr" />
                              <div className="space-sm"></div>

                           <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                            <input onChange={this.handleChange}  type="text" className="form-control url-submit" placeholder="email" name="email"/>
                            </div>
                            <div className="form-group">
                            <input onChange={this.handleChange}  type="password" className="form-control url-submit" placeholder="password" name="password" />
                            </div>
                            <button type="submit" className="btn btn-danger  btn-lg btn-block url-submit">LOGIN</button>
                            <div className="error">{this.props.error} </div>
                            <div className="error">{this.props.unauth_message}</div>

                            <div className="space-sm"></div>
                            <p className="form-control-static signUp-col-right-label">Forgot your password ?<Link to ="/forgot" className=" text-dark">Click Here.</Link> </p>
                            <p className="form-control-static signUp-col-right-label">See our Privacy Policy on how we handle user data.</p>
                          </form>

                          </div>
                          </div>
                      </div>
                  </div>
        </div>

  </div>
)
}
}

// Login.PropTypes = {
// userSigninRequest : React.PropTypes.func.isRequired
// }
// function mapStateToProps(state){
// return {
//
//
// }
// }
function mapStateToProps(state) {
  return {
    unauth_message : state.auth.unauth_message,
    error :  state.auth.signin_error,
    authenticated : state.auth.authenticated
  }

}
function mapDispatchToProps(dispatch){
return bindActionCreators({
signin}, dispatch)
}
export default connect(mapStateToProps,
mapDispatchToProps)(Signin);
