"use strict"
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore , applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import reducers from './reducers/index';
import {addToCart} from './actions/cartActions';
import {postBook,deleteBook,updateBook} from './actions/booksActions';
import logger from 'redux-logger';
import BooksList from './components/pages/booksList';
import Cart  from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from  './main';

const middleWare = applyMiddleware(logger);
const store = createStore(reducers,middleWare);
const Routes = (
 <Provider store={store}>
 <Router history={browserHistory}>
 <Route path="/" component={Main}>
 <IndexRoute component={BooksList}/>
   <Route path="/admin"
 component={BooksForm}/>
  <Route path="/cart"
 component={Cart}/>
  </Route>
  </Router>
  </Provider>
);
 ReactDOM.render(
Routes, document.getElementById('root'));
