"use strict"
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore , applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import reducers from './reducers/index';
import {render} from 'react-dom';
import {addToCart} from './actions/cartActions';
import {postBook,deleteBook,updateBook} from './actions/booksActions';
import logger from 'redux-logger';
import BooksList from './components/pages/booksList';
import thunk from 'redux-thunk';
import Cart  from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import test from './components/pages/test';
import Main from  './main';

const middleWare = applyMiddleware(logger,thunk);
const store = createStore(reducers,middleWare);
const Routes = (
 <Provider store={store}>
 <Router history={browserHistory}>
 <Route path="/" component={Main}>
 <IndexRoute component={BooksList}/>
  <Route path="/admin" component={BooksForm}/>
  <Route path="/cart" component={Cart}/>
  <Route path="/test" component={test}/>

  </Route>
  </Router>
  </Provider>
);
render(
Routes, document.getElementById('root'));
