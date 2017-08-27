import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';


class VerifyMessage extends React.Component{

  constructor(props) {
          super(props);
          this.state = {
              message : '',
                      }
      }

 componentWillMount(){
  if(!this.props.message){

  browserHistory.push('/notFound');
  }
}

  render() {

    return(
      <div className="container">
        <div className="jumbotron center">
        <h3>"We sent an email to your inbox . Please Verify your email to activate the account."</h3>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state){
  return {message : state.auth.message}
}


export default connect(mapStateToProps,null)(VerifyMessage);
