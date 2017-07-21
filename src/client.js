
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore , applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import {Router, Route, IndexRoute,browserHistory} from 'react-router';
import reducers from './reducers/index';
import {render} from 'react-dom';
//import {addToCart} from './actions/cartActions';
//import {postBook,deleteBook,updateBook} from './actions/booksActions';
import logger from 'redux-logger';
import BooksList from './components/pages/booksList';
import thunk from 'redux-thunk';
//import Cart  from './components/pages/cart';
//import BooksForm from './components/pages/booksForm';
import test from './components/pages/test';
import currentResultDetail from './components/pages/currentResultDetail';
import resultDetailsPage from './components/pages/resultDetailsPage';
import Main from  './main';

const middleWare = applyMiddleware(logger,thunk);
const store = createStore(reducers,middleWare);

const Routes = (
 <Provider store={store}>
 <Router history={browserHistory}>
 <Route path="/" component={Main}>
  <IndexRoute component={test}/>
  <Route path="test" component={test}/>
  <Route path="currentTest" component={currentResultDetail}/>
  <Route path="result/:id" component={resultDetailsPage}/>
  </Route>
  </Router>
  </Provider>
)
ReactDOM.render(
  Routes,document.getElementById('root')
);
// render(
// Routes, document.getElementById('root'));
