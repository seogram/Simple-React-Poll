import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class isNotLoggedIn extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (this.props.authenticated) {
        this.context.router.push('/alreadySignIn');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        this.context.router.push('/alreadySignIn');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(isNotLoggedIn);
}
