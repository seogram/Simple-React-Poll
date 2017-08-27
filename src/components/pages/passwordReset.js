import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory,Link} from 'react-router';
import {passwordReset} from '../../actions/auth';

class PasswordReset extends React.Component{



constructor(props){
  super(props);
  this.state = {
    password : ''
  }
  this.onSubmit = this.onSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
}


onSubmit(e) {
  e.preventDefault();
  let password = this.state.password,
      url = window.location.href,
      token = url.split("/").pop(),
      resetObj = {token : token , newPassword : password};
      this.setState({ errors: {}, isLoading: true });
      this.props.passwordReset(resetObj);
    }


handleChange(e) {
this.setState({
[e.target.name] : e.target.value
 });
}

  render() {

    return(
      <div>
      <div className="custom-jumbotron">
        <h2>RESET PASSWORD</h2>
      </div>
        <div className = "space-sm"></div>
          <div className="col-xs-12 col-md-4 col-md-offset-4">
            <p className="center">please enter new password.</p>
              <div className="row" >
                <form onSubmit={this.onSubmit}>
                 <div className="form-group">
                 <input onChange={this.handleChange}  type="text" className="form-control url-submit"  name="password"/>
                 </div>
                 <button type="submit" className="btn btn-danger  btn-lg btn-block url-submit">RESET PASSWORD</button>
                 <div className="error">{this.props.unreset_password_message}{this.props.reset_password_error} </div>
                 </form>
              </div>
          </div>
      </div>

    );
  }
}

function mapStateToProps(state){

    return {
      reset_password_message :  state.auth.reset_password_message,
      unreset_password_message : state.auth.unreset_password_message,
      reset_password_error : state.auth.reset_password_error
    }
}
function mapDispatchToProps(dispatch){
return bindActionCreators({
passwordReset}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PasswordReset);
