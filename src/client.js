
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
import detail from './components/pages/detail';
import submit from './components/pages/submitPoll';

import Main from  './main';


const middleWare = applyMiddleware(logger,thunk);
const store = createStore(reducers,middleWare);


const Routes = (
<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={home}/>
      <Route path="detail/:id" component={detail} />
        <Route path="submit" component={submit} />

      <Route path="*" component={home} />
    </Route>
  </Router>
</Provider>
)
ReactDOM.render(
  Routes,document.getElementById('root')
);
