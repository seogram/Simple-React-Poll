import {
  AUTH_USER,
  UNAUTH_USER,
  PENDING_USER,
  ACTIVATED_USER,
  UNACTIVATED_USER,
  USER_ACTIVATION_ERROR,
  SIGN_UP_AUTH_ERROR,
  SIGN_IN_AUTH_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  UNRESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  FETCH_MESSAGE
} from '../actions/types';

export function authentication (state = {}, action) {
  switch(action.type) {

    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
      break;

    case UNAUTH_USER:
      return { ...state,unauth_message : action.payload, authenticated: false };
      break;

    case PENDING_USER :
      return { ...state,message : action.payload ,authenticated: false};
      break;

    case UNACTIVATED_USER :
      return {...state,unactivated_message:action.payload,authenticated : false};
      break;

    case ACTIVATED_USER :
      return {...state,activation_message : action.payload ,authenticated :false};
      break;

    case USER_ACTIVATION_ERROR :
    return {...state,activation_error :action.payload,authenticated : false}
    case SIGN_UP_AUTH_ERROR:
      return { ...state, error: action.payload,authenticated:false };
      break;

    case SIGN_IN_AUTH_ERROR :
      return { ...state,signin_error : action.payload,authenticated:false};
      break;

    case  FORGOT_PASSWORD :
    return {...state,forgot_password_message : action.payload}
    break;

    case FORGOT_PASSWORD_ERROR :
    return {...state,forgot_password_error : action.payload}
    break;

    case  RESET_PASSWORD :
    return {...state,reset_password_message : action.payload}
    break;

    case UNRESET_PASSWORD :
    return {...state,unreset_password_message : action.payload}
    break;

    case RESET_PASSWORD_ERROR :
    return {...state,reset_password_error : action.payload}
    break;
  }

  return state;
}
