import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';


class ForgotMessage extends React.Component{

  constructor(props) {
          super(props);
          this.state = {
              message : '',
                      }
      }

 componentWillMount(){
  if(!this.props.forgot_password_message){

  browserHistory.push('/notFound');
  }
}

  render() {

    return(
      <div className="container">
        <div className="jumbotron center">
        <h3>"We've sent an email to your inbox with a special link. Click this link to reset your password."</h3>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state){
  return {forgot_password_message : state.auth.forgot_password_message}
}


export default connect(mapStateToProps,null)(ForgotMessage);
