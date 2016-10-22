import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import {browserHistory} from 'react-router';

import App from './App';
import Main from './main/Main';
import About from './about/About';
import Detail from './detail/Detail';

const Routes = (props) => (
  <Router {...props} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/about" component={About} />
      <Route path="/detail/:id" component={Detail} />
    </Route>
  </Router>
);

export default Routes;
