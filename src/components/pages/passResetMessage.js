import React from 'react';
import {connect} from 'react-redux';
//import {signout}  from '../../actions/signout';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';


class passResetMessage extends React.Component{

  constructor(props) {
          super(props);
          this.state = {
              message : '',
                      }
      }

 componentWillMount(){
  if(!this.props.reset_password_message && !this.props.unreset_password_message && !this.props.reset_password_error){

  browserHistory.push('/notFound');
  }
}

  render() {

    return(
      <div className="container">
        <div className="jumbotron center">
        <h3>{this.props.reset_password_message}<br/>{this.props.unreset_password_message}<br/>{this.props.reset_password_error}</h3>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state){
  return {
    reset_password_message : state.auth.reset_password_message,
    unreset_password_message : state.auth.unreset_password_message,
    reset_password_error : state.auth.reset_password_error
  }
}
// function mapDispatchToProps(dispatch){
// return bindActionCreators({
// signout}, dispatch)
// }

export default connect(mapStateToProps,null)(passResetMessage);
