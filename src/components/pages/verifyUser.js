import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {userActivation} from '../../actions/auth'

class VerifyUser extends React.Component{

componentDidMount() {
  let url = window.location.href
  let token = url.split("/").pop();
  this.props.userActivation(token);
}
  render() {

    return(
      <div className="container center">
      <div className="jumbotron">
        <h3>{this.props.activation_message}{this.props.activation_error}{this.props.unactivated_message}</h3>
        <div className = "space-sm"></div>
        <Link to = "/signin" className="signinBTN-verification-message">Sign in</Link>
      </div>
      </div>

    );
  }
}

function mapStateToProps(state){

    return {
      activation_message :  state.auth.activation_message,
      unactivated_message : state.auth.unactivated_message,
      activation_error : state.auth.activation_error
    }
}
function mapDispatchToProps(dispatch){
return bindActionCreators({
userActivation}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(VerifyUser);
