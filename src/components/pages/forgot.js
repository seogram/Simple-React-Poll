"use strict"
  import React from 'react';
  import {connect} from 'react-redux';
  import { Link } from 'react-router';
  import {bindActionCreators} from 'redux';
  import {forgot} from '../../actions/auth';
  import ForgotLeftContent from '../forgot-left-content';


class Forgot extends React.Component{


  constructor(props) {
          super(props);
          this.state = {
              email : '',
              errors: '',
              isLoading: false,
              invalid: false
          }
          this.handleChange = this.handleChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
      }

      componentWillReceiveProps(newProps) {
        if (newProps.forgot_password_error) {
          this.setState({errors:newProps.forgot_password_error});
        }
      }

      onSubmit(e) {
        e.preventDefault();
        let email = {email:this.state.email};
          this.setState({ errors: '', isLoading: true });
          this.props.forgot(email)
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

                      <ForgotLeftContent />

                        <div className="col-xs-12 col-md-6 ">
                            <div className="row" >
                             <div className="signUp-inner-col-right">

                                <p className="signUp-col-right-title">Sign in instead ? <Link to ="/signin" className="text-dark"> Sign in here</Link></p>

                                <div className="clearfix"></div>
                                <div className="space-xs"></div>

                                <hr className="signUp-col-left-hr" />
                                <div className="space-sm"></div>
                                <div className="center">We will send you an email with a link to reset your password.</div>
                                <div className="space-sm"></div>
                             <form onSubmit={this.onSubmit}>
                              <div className="form-group">
                              <input onChange={this.handleChange}  type="text" className="form-control url-submit" placeholder="Enter your login email below." name="email"/>
                              </div>

                              <button type="submit" className="btn btn-danger  btn-lg btn-block url-submit">SEND ME THE LINK</button>
                              <div className="error">{this.state.errors} </div>

                              <div className="space-sm"></div>

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
    forgot_password_error :  state.auth.forgot_password_error,
  }

}
function mapDispatchToProps(dispatch){
return bindActionCreators({
forgot}, dispatch)
}
export default connect(mapStateToProps,
mapDispatchToProps)(Forgot);
