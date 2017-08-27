
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore , applyMiddleware,compose} from 'redux';
import { Provider } from 'react-redux';
import {Router, Route, IndexRoute,browserHistory} from 'react-router';
import reducers from './reducers/index';
import {render} from 'react-dom';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import home  from './components/pages/home';
import Signin from './components/pages/signin';
import Signup from './components/pages/signup';
import Signout from './components/pages/signout';
import Forgot from './components/pages/forgot';
import PasswordReset from './components/pages/passwordReset';
import PassResetMessage from './components/pages/passResetMessage';
import ForgotMessage from './components/pages/forgotMessage'
import alreadySignIn from './components/pages/signinAlready'
import dashboard from './components/pages/dashboard';
import oldReport from './components/pages/oldReport';
import currentResultDetail from './components/pages/currentResultDetail';
import Main from  './main';
import VerifyMessage from './components/pages/verifyMessage';
import VerifyUser from './components/pages/verifyUser';
import Require_Auth from './components/require_auth';
import isNotLoggedIn from './components/require_UnAuth';
import NotFound from './components/pages/NotFound';
import {AUTH_USER}  from './actions/types'
const middleWare = applyMiddleware(logger,thunk);
const store = createStore(reducers,middleWare
// compose (
//   middleWare,
//   window.devToolsExtension ? window.devToolsExtension(): f =>f
// )
  );

  const token = localStorage.getItem('token');
  if(token) {
    store.dispatch({type : AUTH_USER});
  }

const Routes = (
 <Provider store={store}>
 <Router history={browserHistory}>
 <Route path="/" component={Main}>
  <IndexRoute component={home}/>
  <Route path="signin" component={isNotLoggedIn(Signin)}/>
  <Route path="signup" component={isNotLoggedIn(Signup)}/>
  <Route path="alreadySignIn" component={Require_Auth(alreadySignIn)} />
  <Route path="signout" component={Require_Auth(Signout)} />
  <Route path="verifyMessage" component={isNotLoggedIn(VerifyMessage)} />
  <Route path="forgot" component={isNotLoggedIn(Forgot)} />
  <Route path="ForgotMessage" component={isNotLoggedIn(ForgotMessage)} />
  <Route path="passwordReset/:id" component={isNotLoggedIn(PasswordReset)} />
  <Route path="passResetMessage" component={isNotLoggedIn(PassResetMessage)} />
  <Route path="dashboard" component={Require_Auth(dashboard)}/>
  <Route path="history" component={Require_Auth(oldReport)} />
  <Route path="currentTest" component={currentResultDetail}/>
  <Route path="verifyUser/:id" component={isNotLoggedIn(VerifyUser)} />
  <Route path="*" component={NotFound} />

  </Route>
  </Router>
  </Provider>
)
ReactDOM.render(
  Routes,document.getElementById('root')
);
// render(
// Routes, document.getElementById('root'));
