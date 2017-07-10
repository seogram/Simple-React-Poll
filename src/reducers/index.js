import {combineReducers} from 'redux'
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';
import {urlReducers} from './urlReducers';
import {allTestsReducers} from './allTestsReducers';
export default combineReducers({
  books : booksReducers,
  cart : cartReducers,
  test : urlReducers,
  allTests : allTestsReducers
})
