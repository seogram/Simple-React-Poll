import React from 'react';
import {connect} from 'react-redux';
import {signout}  from '../../actions/auth';
import {bindActionCreators} from 'redux';

class Signout extends React.Component{
   componentWillMount() {
    this.props.signout();
  }

  render() {

    return(
      <div>

      <div>Sorry to see you go...</div>
      </div>

    );
  }
}

function mapDispatchToProps(dispatch){
return bindActionCreators({
signout}, dispatch)
}

export default connect(null,mapDispatchToProps)(Signout);
