import {combineReducers} from 'redux'

import {reportReducer} from './reportReducers';
import {allTestsReducer} from './reportReducers';
import {oldReportReducer} from './reportReducers';
import {userProfileReducers} from './userProfile';
import{authentication} from './authentication';
import {reducer as formReducer} from 'redux-form';


export default combineReducers({

  test : reportReducer,
  allTests : allTestsReducer,
  oldReport : oldReportReducer,
  profile : userProfileReducers,
  auth : authentication,


})
