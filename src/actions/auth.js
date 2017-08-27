import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SIGN_IN_AUTH_ERROR,
  SIGN_UP_AUTH_ERROR,
  PENDING_USER,
  FETCH_MESSAGE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_ERROR,
  UNRESET_PASSWORD,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  ACTIVATED_USER,
  UNACTIVATED_USER,
  USER_ACTIVATION_ERROR

} from './types';


export function signin(credentials) {
  return function(dispatch) {

    axios.post('/api/signin',credentials)
      .then(response => {
        if(response.data.info){
        dispatch({ type: UNAUTH_USER , payload : response.data.info.message });
      }else {
        dispatch({ type: AUTH_USER , payload : response.data });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      }

      })
      .catch(() => {

        dispatch({type: SIGN_IN_AUTH_ERROR, payload : 'sign in error'});
      });
  }
}

export function signout (){
  localStorage.removeItem('token');
  browserHistory.push('/');

  return {type: UNAUTH_USER};
}

export function signup (newUser){
  return function(dispatch) {
    // Submit email/password to the server
    axios.post('/api/signup',newUser)
      .then(response => {

        dispatch({ type: PENDING_USER ,payload : 'PENDING_USER'});

        //localStorage.setItem('token', response.data.token);

        browserHistory.push('/verifyMessage');


      })
      .catch((error) => {

        dispatch({type: SIGN_UP_AUTH_ERROR, payload : error.response.data.error});
      });
  }
}


export function forgot(email) {
  return function(dispatch) {

    axios.post('/api/forgot',email)
      .then(response => {

        dispatch({ type: FORGOT_PASSWORD , payload : 'Password reset email sent'});

      //  localStorage.setItem('token', response.data.token);

        browserHistory.push('/forgotMessage');
      })
      .catch((error) => {

        dispatch({type: FORGOT_PASSWORD_ERROR, payload :error.response.data.error});
      });
  }
}

export function passwordReset(resetObj) {
  return function(dispatch) {
console.log('token from action',resetObj);
    axios.post('/api/resetPassword/',resetObj)
      .then(response => {

        if(response.data == 'No user Found'){
          dispatch({ type: UNRESET_PASSWORD , payload:response.data});
          browserHistory.push('/passResetMessage');
        }
        if(response.data !=='No user Found'){
          dispatch({ type: RESET_PASSWORD , payload : response.data});
          browserHistory.push('/passResetMessage');
      }
    })
      .catch(() => {

        dispatch({type: RESET_PASSWORD_ERROR, payload : 'Password reset error'});
        browserHistory.push('/passResetMessage');
      });
  }
}

export function userActivation(token) {
  return function(dispatch) {
console.log('token from action',token);
    axios.get('/api/verifyUser/'+token)
      .then(response => {

        if(response.data == 'No user Found'){
          dispatch({ type: UNACTIVATED_USER , payload:response.data});
          browserHistory.push('/notFound');
        }
        if(response.data !=='No user Found'){
          dispatch({ type: ACTIVATED_USER , payload : response.data});
      }
    })
      .catch(() => {

        dispatch({type: USER_ACTIVATION_ERROR, payload : 'User activation error'});
      });
  }
}
