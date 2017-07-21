import {combineReducers} from 'redux'
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';
import {urlReducers} from './urlReducers';
import {allTestsReducers} from './allTestsReducers';
//import {loadMoreReducers} from './loadMoreReducers';
import {resultDetailsReducers} from './resultDetailsReducers';
export default combineReducers({
  books : booksReducers,
  cart : cartReducers,
  test : urlReducers,
  allTests : allTestsReducers,
//  loadMore : loadMoreReducers,
  resultDetails : resultDetailsReducers
})
